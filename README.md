# Frontend Mentor - Newsletter sign-up form with success message solution

This is a solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3FC1AZbNrv). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./assets/images/Newsletter%20sign-up%20form-with-success-message.png)

<!-- Add a screenshot of your finished solution and update the path above. -->

### Links

- Solution URL: [https://github.com/Iyanu22/newsletter-signup-with-success-message]
- Live Site URL: [https://iyanu22.github.io/newsletter-signup-with-success-message/]

## My process

### Built with

- Semantic HTML5 markup (`<picture>`, `<section>`, `<form>`, `<footer>`)
- SCSS (Sass), compiled to plain CSS, with variables for colours and breakpoints
- Flexbox and CSS Grid
- Mobile-first workflow with `min-width` media queries
- Responsive images with the `<picture>` element (mobile, tablet, desktop illustrations)
- Vanilla JavaScript for form validation and the success state
- Custom `@font-face` loading for Roboto

### What I learned

**Layout and sizing**

- A child's `width: 100%` is relative to its parent, so to stop an image filling the screen you constrain the *container* with `max-width`, not the image. `max-width` is better than `width` because it shrinks on narrow screens instead of causing horizontal scroll.
- Setting `width: 100%; height: auto` on an image lets the browser keep the aspect ratio. Width and height are not inherited, so the `<img>` needs its own rule even when its wrapper is sized.
- Centring: `margin-inline: auto` centres horizontally in a normal block parent. For horizontal and vertical centring, `display: grid; place-items: center` on a parent with `min-height: 100vh` is simpler.
- A unitless `line-height` (Figma's 100% becomes `1`) is safer than `%` or `em`, because children recompute it from their own font size instead of inheriting a fixed pixel value.

**Responsive images**

- CSS cannot swap an `<img>`'s `src`; a `background` on an `<img>` just paints behind it. Use `<picture>` with `<source media="...">` elements instead.
- `<source>` only affects an `<img>` that is a **direct child of the same `<picture>`**. My first attempt wrapped the whole card in `<picture>`, so the sources were ignored.
- Sources are checked top to bottom and the first match wins, so the widest breakpoint goes first.

**Styling details**

- Custom list markers: `list-style: none` plus a `li::before` pseudo-element with a background image gives full control over size and alignment. `flex-shrink: 0` stops the icon squashing when text wraps.
- `gap` on a flex or grid container only adds space *between* items, so there is no leftover space after the last one.
- Buttons can't transition between a colour and a gradient, so the gradient is applied with `background-image`, which paints over `background-color`.

**Form validation in JavaScript**

- `novalidate` on the form turns off the browser's popup bubbles so I can show my own messages, while `required` and `type="email"` still help with mobile keyboards and accessibility.
- Listen for `submit` on the form rather than `click` on the button, so the Enter key is handled too, and call `e.preventDefault()` so the page doesn't reload.
- Keeping `isValidEmail()` separate from the DOM code makes the check reusable. The same function drives both the error message and the button's "ready" state, so there is a single definition of "valid".
- Toggling a class (`classList.toggle("ready", condition)`) keeps visual rules in the stylesheet instead of in JS.
- `aria-live="polite"` on the error span lets screen readers announce validation messages.
- Code placed outside the submit handler runs once on page load, which caused a `ReferenceError` when I used `email` out there.

```js
emailInput.addEventListener("input", () => {
  clearError();
  submitBtn.classList.toggle("ready", isValidEmail(emailInput.value));
});
```

**The `hidden` attribute vs CSS**

- My own `display: flex` on the card overrode the browser's built-in `[hidden]` rule, so `card.hidden = true` did nothing. Adding `[hidden] { display: none !important; }` guarantees hidden elements stay hidden.

**SCSS gotchas**

- Nesting `.submit:hover` inside `.submit` compiles to `.submit .submit:hover`, which matches nothing. Use `&:hover`.
- The same mistake with `#email:focus` nested in `#email`.
- Nesting `.success` inside `.container` meant its styles never applied, because the success section sits outside `.container` in the HTML.
- The browser only reads `style.css`. If the Sass isn't recompiled, new rules don't exist, which looked like a JS bug when it wasn't. Never edit the compiled CSS by hand.

**Debugging**

- `Cannot set properties of null` means a `querySelector` found nothing. The cause was an element commented out in the HTML, not a typo in the script.
- Comparing the line numbers in the console error with the file in DevTools > Sources shows whether the browser is running a stale copy.

### Continued development

- Add a `<main>` landmark and centre the card there so the footer attribution sits below it instead of being centred with the card.
- Finish the mobile success layout (full-height screen with the button pinned to the bottom).
- Match the exact Figma gradient values and hover/focus states for every interactive element.
- Convert the Roboto fonts to `woff2` for smaller downloads, and make the preload paths match the `@font-face` paths.
- Use a more thorough accessibility pass: focus management when the success view appears, and keyboard testing of the dismiss button.

### Useful resources

- [MDN: The Picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) - how `<source>` selection works for responsive images.
- [MDN: `hidden` global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) - and why author CSS can override it.
- [Sass documentation: the parent selector `&`](https://sass-lang.com/documentation/style-rules/parent-selector/) - fixing nested hover and focus rules.
- [MDN: Constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) - what `novalidate` does and doesn't turn off.

### AI Collaboration

I used Claude as a tutor and debugging partner throughout this project, mainly for:

- **Explaining the "why"**: why an image fills the screen, why `<source>` needs a direct `<img>` child, why `[hidden]` gets overridden, and how percentages and `line-height` resolve.
- **Debugging**: the `null` error on `#email-error`, the stale compiled CSS, and the SCSS nesting mistakes that stopped rules from applying.
- **Structuring the JavaScript**: breaking validation into small steps (disable native validation, handle `submit`, validate, show or clear the error, then the success view).
- **Commit messages**: writing clear, imperative messages for each stage.

What worked well: asking follow-up questions until I understood the reason behind a fix, then applying it myself. What needed care: some suggested snippets assumed my HTML matched earlier versions (for example, the success section wrapper), so I had to check IDs and nesting against my own files. Pasting my actual code and console errors made the advice far more accurate.

## Author

- Frontend Mentor - [@Iyanu22](https://www.frontendmentor.io/profile/Iyanu22)