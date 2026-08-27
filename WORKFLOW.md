# AI Workflow Comparison

For this assignment, I built the same settings form twice using Cursor. The first round used one vague prompt: “Create a settings form with validation for my project.” The second round used a detailed specification followed by an explore-plan-code-verify workflow.

## Correctness

The vague prompt produced a working application, but Cursor made many decisions that I had not requested. It created fields for Display Name, Email, Username, Bio, Theme, Language, Timezone, and Notifications. It also created validation rules for these additional fields. In comparison, the precise version followed the requested scope and contained only Display Name, Email, and Theme.

A specific AI mistake I caught was in the theme validation. The vague version allowed three values: `light`, `dark`, and `system`. My Round 2 specification required only Light and Dark. The precise implementation correctly restricted the allowed values to `["light", "dark"]`.

## Accessibility

In Round 2, accessibility was part of the specification instead of being left to the AI to decide. Each field has an associated label, validation errors are connected to the relevant controls, and invalid fields are identified visually. The implementation also focuses the first invalid field after an unsuccessful submission and uses native controls so the form can be navigated with a keyboard.

## Edge Cases and Verification

The precise prompt explicitly required tests for a valid submission, an empty Display Name, an invalid Email, and invalid Theme selection. All four automated tests passed. I also ran syntax checks on the JavaScript files and manually tested the form in the browser. Leaving Display Name and Email empty displayed the correct required-field errors, and entering `abc` as an email produced an invalid-email error.

## Review Effort

Round 1 generated 761 lines across seven files, while Round 2 generated 565 lines across seven files. The branch diff showed 252 deletions and 56 insertions when moving from the vague implementation to the precise implementation. Round 1 therefore required more review because I had to determine which AI-created features were actually necessary. Round 2 took more effort before coding because I had to define requirements and examples, but the resulting implementation was smaller, easier to verify, and more closely aligned with the intended feature.