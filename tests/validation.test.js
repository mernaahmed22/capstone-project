const test = require("node:test");
const assert = require("node:assert/strict");

const { validateField, validateSettingsForm } = require("../src/validation");

test("validateField rejects empty display name", () => {
  assert.equal(validateField("displayName", ""), "Display name is required.");
});

test("validateField accepts valid email", () => {
  assert.equal(validateField("email", "user@example.com"), "");
});

test("validateField rejects invalid username", () => {
  assert.equal(
    validateField("username", "ab"),
    "Username must be 3–20 characters and use only letters, numbers, or underscores."
  );
});

test("validateSettingsForm returns errors for incomplete form", () => {
  const result = validateSettingsForm({
    displayName: "",
    email: "not-an-email",
    username: "valid_user",
    bio: "",
    theme: "system",
    language: "en",
    timezone: "",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.displayName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.timezone);
});

test("validateSettingsForm passes for valid data", () => {
  const result = validateSettingsForm({
    displayName: "Merna Ahmed",
    email: "merna@example.com",
    username: "merna_dev",
    bio: "Building with AI-assisted workflows.",
    theme: "dark",
    language: "en",
    timezone: "UTC",
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});
