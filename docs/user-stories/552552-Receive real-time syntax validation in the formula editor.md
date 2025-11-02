# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-044 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Receive real-time syntax validation in the formula... |
| As A User Story | As a registered user creating or editing a custom ... |
| User Persona | A registered user in the role of a 'Creator', who ... |
| Business Value | Improves the user experience of a core, differenti... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Creation Wizard |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Valid formula with defined variables and allowed functions

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is in the custom mode wizard and has defined input variables 'length' and 'width'

### 3.1.5 When

The user types a syntactically correct formula 'sqrt(length^2 + width^2)' into the formula editor

### 3.1.6 Then

The editor must display a visual indicator of success (e.g., a green checkmark) and show no error messages.

### 3.1.7 Validation Notes

Test with various combinations of allowed functions (sin, cos, log, etc.) and constants (pi, e).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Invalid formula with a syntax error (mismatched parentheses)

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A user is in the custom mode formula editor

### 3.2.5 When

The user types a formula with a missing closing parenthesis, such as '2 * (length + width'

### 3.2.6 Then

The editor must highlight the problematic area and display a clear, user-friendly error message like 'Syntax Error: Mismatched or missing parenthesis.'

### 3.2.7 Validation Notes

Verify that the 'Save' or 'Next' button in the wizard is disabled.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Invalid formula using an undefined variable

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user is in the custom mode wizard and has defined an input variable 'radius'

### 3.3.5 When

The user types a formula using an undefined variable, such as 'pi * diameter'

### 3.3.6 Then

The editor must highlight the word 'diameter' and display a clear error message like 'Validation Error: Variable \'diameter\' is not defined in this mode.'

### 3.3.7 Validation Notes

The check should be case-sensitive based on the defined variable names.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Invalid formula using a disallowed function

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is in the custom mode formula editor

### 3.4.5 When

The user types a formula using a function not on the allow-list, such as 'round(pi)'

### 3.4.6 Then

The editor must highlight the word 'round' and display a clear error message like 'Validation Error: Function \'round\' is not supported. See help for a list of allowed functions.'

### 3.4.7 Validation Notes

The validation logic must strictly adhere to the function allow-list defined in REQ-FRX-001.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Real-time feedback corrects itself upon fixing the formula

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

The formula editor is displaying a syntax error for the input '2 * (length'

### 3.5.5 When

The user adds the closing parenthesis to correct the formula to '2 * (length)'

### 3.5.6 Then

The error message and highlighting must disappear immediately, and the success indicator must be displayed.

### 3.5.7 Validation Notes

This should be triggered by a debounced input handler to ensure performance.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Wizard progression is blocked by an invalid formula

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A user is in the custom mode wizard at the formula definition step

### 3.6.5 When

The formula editor contains an invalid formula, resulting in a validation error being displayed

### 3.6.6 Then

The 'Save' or 'Next' button to proceed in the wizard must be in a disabled state.

### 3.6.7 Validation Notes

Test that the button becomes enabled once the formula is corrected.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Formula input text area
- A dedicated area below the input for displaying validation error messages
- An icon next to the input field to indicate validation status (e.g., checkmark for valid, 'x' for invalid)

## 4.2.0 User Interactions

- Validation should trigger automatically as the user types, using a debounce timer (e.g., 300-500ms) to avoid performance issues.
- The specific part of the formula causing the error (e.g., the invalid function name or variable) should be visually highlighted (e.g., with a red underline).
- Hovering over the error icon or highlighted text may optionally show a tooltip with the full error message.

## 4.3.0 Display Requirements

- Error messages must be human-readable and provide actionable advice.
- The list of currently defined variables for the mode should be visible on the same screen for easy reference.

## 4.4.0 Accessibility Needs

- Error messages must be programmatically linked to the formula input using `aria-describedby` for screen reader users.
- Color used for highlighting errors must have a sufficient contrast ratio to be perceivable by users with low vision, per WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-FRX-VALIDATE-01

### 5.1.2 Rule Description

All functions used in a custom formula must exist in the explicit allow-list defined in REQ-FRX-001.

### 5.1.3 Enforcement Point

Client-side, in the formula editor, in real-time.

### 5.1.4 Violation Handling

Display a validation error and prevent the user from saving the custom mode.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-FRX-VALIDATE-02

### 5.2.2 Rule Description

All variables used in a custom formula must be previously defined as an Input or Output variable for that specific mode.

### 5.2.3 Enforcement Point

Client-side, in the formula editor, in real-time.

### 5.2.4 Violation Handling

Display a validation error and prevent the user from saving the custom mode.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

This story implements a feature within the custom mode creation wizard, which must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-042

#### 6.1.2.2 Dependency Reason

The validation logic requires access to the list of user-defined variables, which is created in this story.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-043

#### 6.1.3.2 Dependency Reason

This story provides the basic formula editor component that will be enhanced with validation.

## 6.2.0.0 Technical Dependencies

- A client-side mathematical expression parsing library (e.g., math.js, expr-eval) capable of generating an Abstract Syntax Tree (AST) for validation.
- A shared configuration module/constant that provides the allow-lists for functions and constants as defined in REQ-FRX-001.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The validation logic must execute in under 50ms to avoid any noticeable lag while the user is typing.
- The validation process must be debounced to prevent excessive processing on every keystroke.

## 7.2.0.0 Security

- While this feature is client-side, the chosen parsing library must be vetted for known security vulnerabilities (e.g., prototype pollution).

## 7.3.0.0 Usability

- Error messages must be clear, concise, and help the user understand how to fix the problem.
- The feedback loop must be immediate to provide a smooth and intuitive creation experience.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards, particularly concerning feedback for user input and color contrast.

## 7.5.0.0 Compatibility

- The feature must function correctly on all browsers specified in REQ-ENV-001 (latest Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires selecting and integrating a third-party parsing library.
- Involves writing logic to traverse the Abstract Syntax Tree (AST) to validate nodes (variables, functions) against the mode's context.
- Requires careful state management in React to handle the formula string, validation state, and UI feedback.
- Implementing a debounced input handler adds a layer of asynchronous complexity.

## 8.3.0.0 Technical Risks

- The chosen parsing library could have a large bundle size, negatively impacting the application's initial load time (violating REQ-NFP-001).
- The parser's error reporting might be too generic, making it difficult to pinpoint the exact location of a syntax error for highlighting.

## 8.4.0.0 Integration Points

- Integrates with the Custom Mode creation wizard's state management (e.g., Redux Toolkit slice) to access the list of defined variables.
- Integrates with the wizard's navigation logic to enable/disable the 'Next'/'Save' button.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Unit test the validation service with a comprehensive suite of valid and invalid formulas.
- Integration test the formula editor component to ensure it correctly displays feedback from the validation service.
- E2E test the full wizard flow, ensuring a user cannot save a mode with an invalid formula.
- Perform accessibility testing using a screen reader and automated tools (e.g., Axe) to verify error message handling.

## 9.3.0.0 Test Data Needs

- A set of test cases with various formulas: simple, complex, nested functions, multiple errors, syntax errors, and contextual errors.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/integration tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit test coverage for the new validation logic exceeds 90%
- Component and E2E tests are implemented and passing in the CI pipeline
- User interface reviewed for usability and consistency with the style guide
- Performance requirements (no typing lag) verified via manual testing
- Accessibility requirements (WCAG 2.1 AA) validated
- Documentation for the custom mode feature is updated to mention the validation capabilities
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a critical enabler for a good user experience in the custom mode feature. It should be prioritized early in the development of the feature set.
- Requires frontend-heavy work. Ensure developer availability with React and state management expertise.

## 11.4.0.0 Release Impact

- Significantly enhances the quality and usability of the User-Extensible Functionality, a key feature of the application.

