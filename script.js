const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const form = document.querySelector("form");
const card = document.querySelector(".container");
const successSection = document.querySelector("#success");
const successEmail = document.querySelector("#success-email");
const dismissBtn = document.querySelector("#dismiss");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function showError(message) {
  emailError.textContent = message;
  emailInput.classList.add("invalid");
}

function clearError() {
  emailError.textContent = "";
  emailInput.classList.remove("invalid");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email === "") return showError("Email required");
  if (!isValidEmail(email)) return showError("Valid email required");

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