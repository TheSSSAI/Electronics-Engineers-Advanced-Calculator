# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-004 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Use logarithmic and exponential functions |
| As A User Story | As a student or professional in a technical field,... |
| User Persona | Student, Engineer, Scientist, or any user performi... |
| Business Value | Expands the calculator's capabilities to meet the ... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Scientific Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Calculate base-10 logarithm of a positive number

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The calculator application is open

### 3.1.5 When

The user enters the expression 'log(100)' and executes the calculation

### 3.1.6 Then

The result '2' is displayed.

### 3.1.7 Validation Notes

Verify by entering 'log(100)' via UI buttons or keyboard and checking the result display.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Calculate natural logarithm of a positive number

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The calculator application is open and the constant 'e' is available

### 3.2.5 When

The user enters the expression 'ln(e)' and executes the calculation

### 3.2.6 Then

The result '1' is displayed.

### 3.2.7 Validation Notes

Verify by entering 'ln(' and then the 'e' constant button, followed by ')' and checking the result.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Calculate the exponential function (e^x)

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The calculator application is open

### 3.3.5 When

The user enters the expression 'exp(1)' and executes the calculation

### 3.3.6 Then

The result is displayed as approximately '2.718281828'.

### 3.3.7 Validation Notes

Verify by entering 'exp(1)' and checking the result against the known value of Euler's number.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Use logarithmic functions within a complex expression

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The calculator application is open

### 3.4.5 When

The user enters the expression '5 * log(100) + 2 * ln(e^2)' and executes the calculation

### 3.4.6 Then

The result '14' is displayed, correctly following the order of operations.

### 3.4.7 Validation Notes

The expression should evaluate as 5 * 2 + 2 * 2 = 10 + 4 = 14.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to calculate logarithm of a negative number

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The calculator application is open

### 3.5.5 When

The user enters the expression 'log(-10)' and attempts to execute the calculation

### 3.5.6 Then

A clear, non-destructive error message (e.g., 'Error: Invalid input') is displayed, and the user's original input 'log(-10)' is preserved in the input field.

### 3.5.7 Validation Notes

Check that the application does not crash and provides user-friendly feedback as per REQ-FRC-001.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to calculate logarithm of zero

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

The calculator application is open

### 3.6.5 When

The user enters the expression 'ln(0)' and attempts to execute the calculation

### 3.6.6 Then

A clear, non-destructive error message (e.g., 'Error: Invalid input' or '-Infinity') is displayed, and the user's original input 'ln(0)' is preserved.

### 3.6.7 Validation Notes

The IEEE 754 standard for `log(0)` is `-Infinity`. The UI should handle this gracefully, either displaying it or mapping it to a user-friendly error.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Functions are available in the custom mode formula sandbox

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A registered user is in the custom mode creation wizard

### 3.7.5 When

The user enters a formula such as 'log(input_A)' in the formula editor

### 3.7.6 Then

The formula is accepted as valid, and the 'log' function is correctly evaluated when the custom mode is used.

### 3.7.7 Validation Notes

This verifies compliance with REQ-FRX-001, which requires these functions to be on the sandbox allow-list.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated button for 'log' (base-10 logarithm).
- A dedicated button for 'ln' (natural logarithm).
- A dedicated button for 'exp' (e^x).

## 4.2.0 User Interactions

- Clicking a function button (e.g., 'log') should append the function name and an opening parenthesis 'log(' to the current input expression.
- The buttons should provide visual feedback on press, consistent with other calculator buttons.

## 4.3.0 Display Requirements

- The input display must correctly show the function names as they are typed (e.g., '5*log(10)').
- The result display must show the calculated value with the configured precision.

## 4.4.0 Accessibility Needs

- All new buttons must be fully keyboard navigable (Tab and Enter/Space).
- Buttons must have appropriate ARIA labels, e.g., `aria-label="logarithm base 10"`, `aria-label="natural logarithm"`, `aria-label="exponential function"`.
- UI elements must meet WCAG 2.1 Level AA contrast requirements (REQ-UI-001).

# 5.0.0 Business Rules

*No items available*

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-001', 'dependency_reason': 'Requires the core arithmetic expression parser and evaluation engine to be in place.'}

## 6.2.0 Technical Dependencies

- A foundational UI component for the calculator's button grid.
- The mathematical evaluation library/module used by the application.

## 6.3.0 Data Dependencies

*No items available*

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- All client-side calculations involving these functions must complete in under 50ms as per REQ-NFP-001.

## 7.2.0 Security

- When used in custom modes, the functions must execute within the secure sandbox defined in REQ-CON-001 and REQ-NFS-001.

## 7.3.0 Usability

- The function buttons should be logically grouped with other scientific functions (e.g., sin, cos, tan) for intuitive access.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Leverages native JavaScript `Math` object functions (`Math.log10`, `Math.log`, `Math.exp`).
- Work primarily involves UI button creation and integration into the existing expression evaluator.
- Requires a configuration update to the custom mode sandbox allow-list.

## 8.3.0 Technical Risks

- Minor risk of inconsistent floating-point precision across different browser JavaScript engines, which should be mitigated by standardized testing.

## 8.4.0 Integration Points

- Frontend: Calculator UI component (button grid and display).
- Logic: Core expression evaluation service/module.
- Backend: AWS Lambda configuration for the custom mode formula execution sandbox.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify correct calculation for a range of positive integer and decimal inputs.
- Verify correct handling of domain errors (zero and negative inputs for logs).
- Verify correct order of operations in complex expressions.
- Verify UI interaction of clicking buttons and updating the input display.
- Verify keyboard accessibility for all new UI elements.
- Verify function availability and correctness within a user-created custom mode.

## 9.3.0 Test Data Needs

- Set of inputs with known correct outputs (e.g., log(1)=0, ln(1)=0, exp(0)=1).
- Invalid inputs to test error handling (e.g., -1, 0).
- Large and small numbers to test precision and overflow/underflow handling (e.g., exp(1000), exp(-1000)).

## 9.4.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for E2E tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests implemented for the evaluation logic, achieving >85% coverage for new code
- Component and E2E tests for UI interactions and calculations are implemented and passing
- UI changes reviewed and approved for consistency and usability
- Accessibility requirements (keyboard nav, ARIA labels) verified
- The functions `log`, `ln`, `exp` are confirmed to be on the custom mode sandbox allow-list
- Documentation for these functions is added to the in-app help system (as part of REQ-FRC-001)
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

1

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational scientific feature and should be prioritized early in development.
- Can be bundled with other core mathematical function stories (e.g., US-002, US-003, US-005) as they touch similar parts of the codebase.

## 11.4.0 Release Impact

Essential for the initial v1.0 release to market the product as a 'scientific' calculator.

