const test = require("node:test");
const assert = require("node:assert/strict");

const { validateField, validateSettingsForm } = require("../src/validation");

test("validateSettingsForm passes for valid data", () => {
  const result = validateSettingsForm({
    displayName: "Merna",
    email: "user@example.com",
    theme: "light",
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test("validateField rejects empty display name", () => {
  assert.equal(validateField("displayName", ""), "Display name is required.");
});

test("validateField rejects invalid email", () => {
  assert.equal(validateField("email", "abc"), "Enter a valid email address.");
});

test("validateField rejects invalid theme", () => {
  assert.equal(validateField("theme", "system"), "Choose Light or Dark theme.");
});
