const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_THEMES = ["light", "dark"];

const FIELD_RULES = {
  displayName: {
    label: "Display name",
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Display name is required.";
      }
      if (trimmed.length < 2) {
        return "Display name must be at least 2 characters.";
      }
      if (trimmed.length > 50) {
        return "Display name must be 50 characters or fewer.";
      }
      return "";
    },
  },
  email: {
    label: "Email",
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Email is required.";
      }
      if (!EMAIL_PATTERN.test(trimmed)) {
        return "Enter a valid email address.";
      }
      return "";
    },
  },
  theme: {
    label: "Theme",
    validate(value) {
      if (!ALLOWED_THEMES.includes(value)) {
        return "Choose Light or Dark theme.";
      }
      return "";
    },
  },
};

function validateField(name, value) {
  const rule = FIELD_RULES[name];
  if (!rule) {
    return "";
  }
  return rule.validate(value);
}

function validateSettingsForm(formData) {
  const errors = {};

  for (const [name, rule] of Object.entries(FIELD_RULES)) {
    const value = formData[name] ?? "";
    const error = rule.validate(value);
    if (error) {
      errors[name] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

const validation = {
  FIELD_RULES,
  validateField,
  validateSettingsForm,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = validation;
}

if (typeof window !== "undefined") {
  window.FIELD_RULES = validation.FIELD_RULES;
  window.validateField = validation.validateField;
  window.validateSettingsForm = validation.validateSettingsForm;
}
