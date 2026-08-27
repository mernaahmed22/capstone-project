const form = document.getElementById("settings-form");
const formStatus = document.getElementById("form-status");
const bioField = document.getElementById("bio");
const bioCount = document.getElementById("bio-count");

const VALIDATED_FIELDS = Object.keys(FIELD_RULES);

function getFieldValue(fieldName) {
  const element = form.elements[fieldName];
  if (!element) {
    return "";
  }

  if (element.type === "checkbox") {
    return element.checked;
  }

  return element.value;
}

function getFormData() {
  const data = {};

  for (const fieldName of VALIDATED_FIELDS) {
    data[fieldName] = getFieldValue(fieldName);
  }

  data.notifications = getFieldValue("notifications");
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

function updateBioCount() {
  bioCount.textContent = `${bioField.value.length} / 500`;
}

function handleReset() {
  clearFormStatus();

  for (const fieldName of VALIDATED_FIELDS) {
    setFieldError(fieldName, "");
  }

  updateBioCount();
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
}

bioField.addEventListener("input", updateBioCount);
updateBioCount();
