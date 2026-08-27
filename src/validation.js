const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

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
  username: {
    label: "Username",
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Username is required.";
      }
      if (!USERNAME_PATTERN.test(trimmed)) {
        return "Username must be 3–20 characters and use only letters, numbers, or underscores.";
      }
      return "";
    },
  },
  bio: {
    label: "Bio",
    validate(value) {
      if (value.length > 500) {
        return "Bio must be 500 characters or fewer.";
      }
      return "";
    },
  },
  theme: {
    label: "Theme",
    validate(value) {
      const allowed = ["light", "dark", "system"];
      if (!allowed.includes(value)) {
        return "Choose a valid theme.";
      }
      return "";
    },
  },
  language: {
    label: "Language",
    validate(value) {
      const allowed = ["en", "es", "fr", "de"];
      if (!allowed.includes(value)) {
        return "Choose a valid language.";
      }
      return "";
    },
  },
  timezone: {
    label: "Timezone",
    validate(value) {
      if (!value) {
        return "Timezone is required.";
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
