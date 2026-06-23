// VitalFit custom JavaScript written for the assignment.
// This file controls accessibility options, filtering, forms, FAQ accordions and the pop-up guide.

document.addEventListener("DOMContentLoaded", () => {
    setupActiveNavigation();
    setupAccessibilityControls();
    setupTourModal();
    setupClassFilters();
    setupBookingPage();
    setupContactPage();
    setupFaqAccordion();
});

function setupActiveNavigation() {
    const activePage = document.documentElement.dataset.activePage;
    document.querySelectorAll(".main-nav a").forEach((link) => {
        if (link.dataset.page === activePage) {
            link.setAttribute("aria-current", "page");
        }
    });
}

function setupAccessibilityControls() {
    const largeTextButton = document.getElementById("large-text-toggle");
    const contrastButton = document.getElementById("contrast-toggle");

    if (localStorage.getItem("vitalfit-large-text") === "true") {
        document.body.classList.add("large-text");
    }

    if (localStorage.getItem("vitalfit-high-contrast") === "true") {
        document.body.classList.add("high-contrast");
    }

    if (largeTextButton) {
        largeTextButton.addEventListener("click", () => {
            document.body.classList.toggle("large-text");
            localStorage.setItem("vitalfit-large-text", document.body.classList.contains("large-text"));
        });
    }

    if (contrastButton) {
        contrastButton.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
            localStorage.setItem("vitalfit-high-contrast", document.body.classList.contains("high-contrast"));
        });
    }
}

function setupTourModal() {
    const openButton = document.getElementById("open-tour");
    const closeButton = document.getElementById("close-tour");
    const modal = document.getElementById("tour-modal");

    if (!openButton || !closeButton || !modal) {
        return;
    }

    openButton.addEventListener("click", () => {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        closeButton.focus();
    });

    closeButton.addEventListener("click", () => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        openButton.focus();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
            openButton.focus();
        }
    });
}

function setupClassFilters() {
    const classType = document.getElementById("class-type");
    const difficulty = document.getElementById("difficulty");
    const time = document.getElementById("time");
    const seniorFriendly = document.getElementById("senior-friendly");
    const lowImpact = document.getElementById("low-impact");
    const resetFilters = document.getElementById("reset-filters");
    const resultCount = document.getElementById("result-count");
    const selectedFilters = document.getElementById("selected-filters");
    const noResults = document.getElementById("no-results");
    const cards = Array.from(document.querySelectorAll(".class-card"));

    // Require all controls to exist before proceeding to avoid runtime errors on pages without the filters
    if (!classType || !difficulty || !time || !seniorFriendly || !lowImpact || !resetFilters || !resultCount || !selectedFilters || !noResults || cards.length === 0) {
        return;
    }

    function updateFilters() {
        let visibleCount = 0;
        const activeTags = [];

        const typeValue = classType.value;
        const difficultyValue = difficulty.value;
        const timeValue = time.value;
        const seniorChecked = seniorFriendly.checked;
        const lowImpactChecked = lowImpact.checked;

        if (typeValue !== "all") activeTags.push(typeValue);
        if (difficultyValue !== "all") activeTags.push(difficultyValue);
        if (timeValue !== "all") activeTags.push(timeValue);
        if (seniorChecked) activeTags.push("senior-friendly");
        if (lowImpactChecked) activeTags.push("low-impact");

        cards.forEach((card) => {
            const cardType = card.dataset.type || "";
            const cardDifficulty = card.dataset.difficulty || "";
            const cardTime = card.dataset.time || "";

            const matchesType = typeValue === "all" || cardType.includes(typeValue);
            const matchesDifficulty = difficultyValue === "all" || cardDifficulty === difficultyValue;
            const matchesTime = timeValue === "all" || cardTime === timeValue;
            const matchesSenior = !seniorChecked || cardType.includes("senior");
            const matchesLowImpact = !lowImpactChecked || cardType.includes("low-impact");

            const shouldShow = matchesType && matchesDifficulty && matchesTime && matchesSenior && matchesLowImpact;
            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        resultCount.textContent = visibleCount;
        noResults.hidden = visibleCount !== 0;

        selectedFilters.innerHTML = "";
        if (activeTags.length === 0) {
            const tag = document.createElement("span");
            tag.textContent = "All classes";
            selectedFilters.appendChild(tag);
        } else {
            activeTags.forEach((filter) => {
                const tag = document.createElement("span");
                tag.textContent = filter;
                selectedFilters.appendChild(tag);
            });
        }
    }

    [classType, difficulty, time, seniorFriendly, lowImpact].forEach((control) => {
        control.addEventListener("change", updateFilters);
    });

    resetFilters.addEventListener("click", () => {
        classType.value = "all";
        difficulty.value = "all";
        time.value = "all";
        seniorFriendly.checked = false;
        lowImpact.checked = false;
        updateFilters();
    });

    updateFilters();
}

function setupBookingPage() {
    const bookingForm = document.getElementById("booking-form");
    const selectedClassName = document.getElementById("selected-class-name");
    const saveProgressButton = document.getElementById("save-progress");

    if (selectedClassName) {
        const params = new URLSearchParams(window.location.search);
        const classFromUrl = params.get("class");
        if (classFromUrl) {
            selectedClassName.textContent = classFromUrl;
        }
    }

    if (!bookingForm) {
        return;
    }

    const nameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const successMessage = document.getElementById("booking-success");

    // Ensure expected elements exist before attaching handlers
    if (!nameInput || !emailInput || !nameError || !emailError || !successMessage) {
        return;
    }

    if (saveProgressButton) {
        saveProgressButton.addEventListener("click", () => {
            successMessage.textContent = "Your progress has been saved on this device.";
        });
    }

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";
        successMessage.textContent = "";

        let valid = true;

        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Please enter your full name.";
            valid = false;
        }

        if (!emailInput.validity.valid) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (!valid) {
            return;
        }

        successMessage.textContent = "Booking confirmed. Your class details and next steps are now shown clearly.";
        bookingForm.reset();
    });
}

function setupContactPage() {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contact-name");
        const email = document.getElementById("contact-email");
        const message = document.getElementById("message");
        const nameError = document.getElementById("contact-name-error");
        const emailError = document.getElementById("contact-email-error");
        const messageError = document.getElementById("message-error");
        const success = document.getElementById("contact-success");

        // Ensure expected elements exist before validation
        if (!name || !email || !message || !nameError || !emailError || !messageError || !success) {
            return;
        }

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        success.textContent = "";

        let valid = true;

        if (name.value.trim().length < 2) {
            nameError.textContent = "Please enter your name.";
            valid = false;
        }

        if (!email.validity.valid) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (message.value.trim().length < 5) {
            messageError.textContent = "Please enter a message.";
            valid = false;
        }

        if (!valid) {
            return;
        }

        success.textContent = "Message sent. VitalFit will contact you using the details provided.";
        contactForm.reset();
    });
}

function setupFaqAccordion() {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((button) => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            if (!answer) return;
            const expanded = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!expanded));
            answer.hidden = expanded;
        });
    });
}
