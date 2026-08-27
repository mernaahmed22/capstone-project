const form = document.getElementById("settings-form");
const formStatus = document.getElementById("form-status");

const VALIDATED_FIELDS = Object.keys(FIELD_RULES);

function getFieldValue(fieldName) {
  const element = form.elements[fieldName];
  if (!element) {
    return "";
  }

  return element.value;
}

function getFormData() {
  const data = {};

  for (const fieldName of VALIDATED_FIELDS) {
    data[fieldName] = getFieldValue(fieldName);
  }

  return data;
}

function setFieldError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (!input || !errorElement) {
    return;
  }

  errorElement.textContent = message;
  input.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function clearFormStatus() {
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status form-status--${type}`;
}

function validateSingleField(fieldName) {
  const value = getFieldValue(fieldName);
  const error = validateField(fieldName, value);
  setFieldError(fieldName, error);
  return !error;
}

function validateForm() {
  const result = validateSettingsForm(getFormData());

  for (const fieldName of VALIDATED_FIELDS) {
    setFieldError(fieldName, result.errors[fieldName] || "");
  }

  return result.isValid;
}

function handleReset() {
  clearFormStatus();

  for (const fieldName of VALIDATED_FIELDS) {
    setFieldError(fieldName, "");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFormStatus();

  if (!validateForm()) {
    showFormStatus("Fix the highlighted fields before saving.", "error");
    const firstInvalid = form.querySelector(".is-invalid");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  const data = getFormData();
  console.log("Settings saved:", data);
  showFormStatus("Settings saved successfully.", "success");
});

form.addEventListener("reset", () => {
  window.setTimeout(handleReset, 0);
});

for (const fieldName of VALIDATED_FIELDS) {
  const element = form.elements[fieldName];
  if (!element) {
    continue;
  }

  element.addEventListener("blur", () => {
    validateSingleField(fieldName);
  });

  element.addEventListener("input", () => {
    if (element.classList.contains("is-invalid")) {
      validateSingleField(fieldName);
    }
  });

  element.addEventListener("change", () => {
    if (element.classList.contains("is-invalid")) {
      validateSingleField(fieldName);
    }
  });
}
