# VitalFit Wellness Centre
by Frederick Sappor

VitalFit Wellness Centre is a responsive front-end website prototype based on the Assignment 1 wireframes. The website supports users who want to view fitness services, filter classes, book a session and contact the centre for help.

## Live Website



## Repository



## Aims and Objectives

The aim of the website is to provide an accessible online platform for VitalFit users.

Objectives:

- Provide clear information about personal training, group classes and nutrition guidance.
- Allow users to filter classes by type, difficulty, time and accessibility needs.
- Include a functional booking form.
- Include a contact form and FAQ support area.
- Provide accessibility features such as large text, high contrast, alt text, clear labels and keyboard-friendly navigation.
- Make the layout responsive using custom HTML5, CSS3 and JavaScript.

## User Stories

### Aisha: First-Time Visitor

As a first-time visitor, I want to understand VitalFit’s services and book a beginner class so that I can decide whether the centre is suitable for me.

### Jake: Returning Visitor

As a returning visitor, I want to book and manage classes quickly so that I can keep my workout routine organised.

### Mary: Frequent Visitor

As a frequent visitor with accessibility needs, I want to save my accessibility preferences and book senior-friendly sessions so that I can use the website independently.

## Design

The design is based on the revised Assignment 1 wireframes. The final website keeps the same wireframe-style structure so the design can clearly be linked back to the original UX planning.

Pages included:

- Home page
- Classes page
- Booking form page
- Contact and FAQ page

## Revised Wireframe Justification

### Home Page

The revised home page places the main call-to-action buttons near the top of the page. This helps Aisha understand the website quickly and decide whether to view classes or book.

The A+ and Contrast controls are placed in the header so users like Mary can access them immediately.

### Classes Page

The revised classes page includes filters, a visible results count and selected filter tags. This supports Jake because he can find suitable classes quickly.

Senior-friendly and low-impact options support Mary by helping her find suitable sessions independently.

### Booking Page

The booking form includes a step indicator, selected class summary, visible labels, validation messages and a confirmation message.

This improves usability because users know where they are in the process and can correct mistakes before submitting.

### Contact and FAQ Page

The FAQ section uses accordion controls with ARIA expanded and collapsed states. This keeps the page simple and supports screen-reader users.

The contact form and Call VitalFit button give users more than one support route.

## Development

The website was developed using:

- HTML5
- CSS3
- JavaScript
- Visual Studio Code
- GitHub
- GitHub Pages

## Features

- Four linked pages
- Responsive navigation
- Wireframe-style website layout
- Class filters with live result count
- Booking form validation
- Contact form validation
- FAQ accordion
- Large text toggle
- High contrast toggle
- User-controlled pop-up guide
- External links open in a new tab
- Clear folder structure

## Project Structure

```text
vitalfit-wellness-centre/
├── index.html
├── classes.html
├── booking.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
```

## Testing

### Manual Testing

| Test | Action | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| Navigation | Click each navigation link | Correct page opens | Works as expected | Pass |
| A+ control | Click A+ button | Text becomes larger | Works as expected | Pass |
| Contrast control | Click Contrast button | High contrast mode activates | Works as expected | Pass |
| Class filters | Select class filters | Results update | Works as expected | Pass |
| Booking form empty | Submit empty booking form | Error messages show | Works as expected | Pass |
| Booking form complete | Submit valid booking form | Confirmation message shows | Works as expected | Pass |
| FAQ accordion | Click FAQ questions | Answers open and close | Works as expected | Pass |
| Contact form empty | Submit empty contact form | Error messages show | Works as expected | Pass |
| Mobile layout | Resize browser | Layout stacks clearly | Works as expected | Pass |

### User Story Testing

| User | User Need | Test | Result |
|---|---|---|---|
| Aisha | Understand services and book a beginner class | Used homepage service cards and booking form | Pass |
| Jake | Filter and book classes quickly | Used class filters and booking link | Pass |
| Mary | Use accessibility controls and find senior sessions | Used A+, Contrast and senior-friendly filter | Pass |

### Bugs and Fixes

| Bug | Fix | Status |
|---|---|---|
| Navigation was crowded on mobile | Added responsive CSS media queries | Fixed |
| Form errors were unclear | Added plain-language validation messages | Fixed |
| FAQ did not show screen-reader state | Added aria-expanded control | Fixed |


## Version Control

## Attribution
External websites used for research or guidance:

- W3C WCAG guidance
- PureGym competitor research

