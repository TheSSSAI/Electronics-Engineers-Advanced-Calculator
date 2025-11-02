# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-005 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Calculate powers and square roots |
| As A User Story | As a student, engineer, or scientist, I want to pe... |
| User Persona | Any user of the scientific calculator who needs to... |
| Business Value | Provides fundamental scientific calculator functio... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Scientific Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Power calculation with positive integers

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user has entered the expression '2^3'

### 3.1.5 When

The user triggers the calculation

### 3.1.6 Then

The system shall display the result '8'.

### 3.1.7 Validation Notes

Verify using the UI. The power operator can be represented by '^' or an 'x^y' button.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Square root calculation of a perfect square

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user has entered the expression '√(16)'

### 3.2.5 When

The user triggers the calculation

### 3.2.6 Then

The system shall display the result '4'.

### 3.2.7 Validation Notes

Verify using the UI. The square root function can be represented by a '√' button.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Power calculation with a negative base

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

The user has entered the expression '(-2)^4'

### 3.3.5 When

The user triggers the calculation

### 3.3.6 Then

The system shall display the result '16'.

### 3.3.7 Validation Notes

Verify that the parser correctly handles parentheses and negative bases.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Power calculation with a negative exponent

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

The user has entered the expression '4^-2'

### 3.4.5 When

The user triggers the calculation

### 3.4.6 Then

The system shall display the result '0.0625'.

### 3.4.7 Validation Notes

Verify calculation of `1 / (4^2)`.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Power calculation with a fractional exponent (equivalent to a root)

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

The user has entered the expression '27^(1/3)'

### 3.5.5 When

The user triggers the calculation

### 3.5.6 Then

The system shall display the result '3'.

### 3.5.7 Validation Notes

Verify that fractional exponents are calculated correctly.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Square root of a non-perfect square

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

The user has entered the expression '√(2)'

### 3.6.5 When

The user triggers the calculation

### 3.6.6 Then

The system shall display the result with appropriate precision (e.g., '1.41421356').

### 3.6.7 Validation Notes

Verify the precision matches the calculator's overall display settings.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Correct order of operations (PEMDAS/BODMAS)

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

The user has entered the expression '5 + 2^3 * 2'

### 3.7.5 When

The user triggers the calculation

### 3.7.6 Then

The system shall first calculate 2^3=8, then 8*2=16, then 5+16=21, and display the final result '21'.

### 3.7.7 Validation Notes

This tests that the power operator has higher precedence than multiplication and addition.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Attempt to calculate the square root of a negative number

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

The user has entered the expression '√(-9)'

### 3.8.5 When

The user triggers the calculation

### 3.8.6 Then

The system shall display a clear, non-destructive error message (e.g., 'Invalid Input' or 'Not a real number') and preserve the original input.

### 3.8.7 Validation Notes

Refer to REQ-FRC-001 for error message requirements. The result should not be 'NaN' without a user-friendly message.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Power calculation with an exponent of zero

### 3.9.3 Scenario Type

Edge_Case

### 3.9.4 Given

The user has entered the expression '34^0'

### 3.9.5 When

The user triggers the calculation

### 3.9.6 Then

The system shall display the result '1'.

### 3.9.7 Validation Notes

Verify for any non-zero base.

## 3.10.0 Criteria Id

### 3.10.1 Criteria Id

AC-010

### 3.10.2 Scenario

Power calculation with a base of zero and a negative exponent

### 3.10.3 Scenario Type

Edge_Case

### 3.10.4 Given

The user has entered the expression '0^-2'

### 3.10.5 When

The user triggers the calculation

### 3.10.6 Then

The system shall display an error message indicating division by zero (e.g., 'Infinity' or 'Error').

### 3.10.7 Validation Notes

This is equivalent to 1/(0^2), which is 1/0.

## 3.11.0 Criteria Id

### 3.11.1 Criteria Id

AC-011

### 3.11.2 Scenario

Power calculation of zero to the power of zero

### 3.11.3 Scenario Type

Edge_Case

### 3.11.4 Given

The user has entered the expression '0^0'

### 3.11.5 When

The user triggers the calculation

### 3.11.6 Then

The system shall display the result '1'.

### 3.11.7 Validation Notes

This follows the standard behavior of JavaScript's `Math.pow(0,0)` and many computational systems for pragmatic reasons.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated button for the power function, labeled 'x^y' or '^'.
- A dedicated button for the square root function, labeled '√'.

## 4.2.0 User Interactions

- Clicking the 'x^y' button should append the power operator (e.g., '^') to the current input expression.
- Clicking the '√' button should append the square root function (e.g., '√(') to the current input expression.

## 4.3.0 Display Requirements

- The input display must correctly render the power and square root operators as they are typed.
- Error messages for invalid operations (e.g., square root of a negative number) must be displayed clearly in the result area without clearing the user's input, as per REQ-FRC-001.

## 4.4.0 Accessibility Needs

- The 'x^y' and '√' buttons must be fully keyboard accessible (focusable and activatable via Enter/Space).
- The buttons must have appropriate ARIA labels (e.g., 'power', 'square root') for screen reader users, compliant with WCAG 2.1 Level AA (REQ-UI-001).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-002

### 5.1.2 Rule Description

The square root function is only defined for non-negative real numbers.

### 5.1.3 Enforcement Point

During expression evaluation, before the square root calculation is performed.

### 5.1.4 Violation Handling

The calculation is aborted, and a user-friendly error message is displayed as the result.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-003

### 5.2.2 Rule Description

The power operator ('^') must have a higher precedence than multiplication and division, and lower precedence than functions and parentheses.

### 5.2.3 Enforcement Point

Within the mathematical expression parser.

### 5.2.4 Violation Handling

N/A - This is a structural rule for the parser's logic.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-001', 'dependency_reason': 'This story extends the core calculator functionality. The basic UI, input display, and expression evaluation engine from US-001 must exist before power and square root operators can be added.'}

## 6.2.0 Technical Dependencies

- The application's mathematical expression parser.
- The UI component library for adding new buttons.

## 6.3.0 Data Dependencies

*No items available*

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- All calculations, including power and square root, must complete and update the UI in under 50ms as per REQ-NFP-001.

## 7.2.0 Security

- Input containing these operators must be properly sanitized to prevent any form of injection if the evaluation logic were ever to change (though current scope is client-side math).

## 7.3.0 Usability

- The function of the 'x^y' and '√' buttons should be immediately obvious to anyone familiar with a scientific calculator.

## 7.4.0 Accessibility

- All functionality must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- The primary task is extending the existing expression parser to recognize and correctly prioritize the new operators/functions.
- UI work is minimal (adding two buttons).
- The underlying math functions (`Math.pow()` and `Math.sqrt()`) are standard and readily available.

## 8.3.0 Technical Risks

- A low risk of introducing a regression bug in the order of operations within the expression parser. This can be mitigated with a comprehensive unit test suite for the parser.

## 8.4.0 Integration Points

- Integrates with the main calculator UI component.
- Integrates with the core expression parsing and evaluation service.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0 Test Scenarios

- Verify all acceptance criteria through automated unit and E2E tests.
- Test complex nested expressions involving powers, roots, and other arithmetic operations (e.g., '√(4^3 + 6*6)').
- Test user input sequences, such as entering a negative number and then pressing the square root button.

## 9.3.0 Test Data Needs

- Positive integers, negative numbers, zero, fractions, and non-perfect squares.

## 9.4.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for end-to-end tests.

# 10.0.0 Definition Of Done

- All acceptance criteria are validated and passing in automated tests.
- Code has been peer-reviewed and merged into the main branch.
- Unit test coverage for the modified parser logic meets or exceeds the project standard (85%).
- New UI elements are responsive and meet accessibility standards (WCAG 2.1 AA).
- E2E tests simulating user interaction with the new buttons are created and passing.
- No performance regressions have been introduced.
- The feature is deployed and verified in the staging environment.

# 11.0.0 Planning Information

## 11.1.0 Story Points

2

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational feature for the scientific calculator and should be prioritized early in the development cycle, immediately after the basic arithmetic functionality is complete.

## 11.4.0 Release Impact

- Essential for the initial v1.0 launch. The product cannot be marketed as a 'scientific calculator' without this functionality.

