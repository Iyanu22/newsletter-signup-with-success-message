
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const form = document.querySelector("form");
const card = document.querySelector(".container");
const successSection = document.querySelector("#success");
const successEmail = document.querySelector("#success-email");
const dismissBtn = document.querySelector("#dismiss");

form.noValidate = true; 

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function showError(message) {
  emailError.textContent = message;
  emailInput.classList.add("invalid");
  emailInput.setAttribute("aria-invalid", "true");
}

function clearError() {
  emailError.textContent = "";
  emailInput.classList.remove("invalid");
  emailInput.removeAttribute("aria-invalid");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email === "") { showError("Email required"); return emailInput.focus(); }
  if (!isValidEmail(email)) { showError("Valid email required"); return emailInput.focus(); }

  clearError();
  successEmail.textContent = email;   // now inside the handler
  card.hidden = true;
  successSection.hidden = false;
});

const submitBtn = document.querySelector(".submit");

emailInput.addEventListener("input", () => {
  clearError();
  submitBtn.classList.toggle("ready", isValidEmail(emailInput.value));
});

dismissBtn.addEventListener("click", () => {
  successSection.hidden = true;
  card.hidden = false;
  form.reset();
   submitBtn.classList.remove("ready"); //
});