# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-006 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Calculate factorials |
| As A User Story | As a student or professional in a scientific or en... |
| User Persona | Scientific/Engineering User (e.g., student, engine... |
| Business Value | Provides a fundamental function required for a sci... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Scientific Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Calculate factorial of a positive integer

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user has entered the number '5' into the calculator

### 3.1.5 When

The user activates the factorial '!' operation

### 3.1.6 Then

The calculator displays the result '120'.

### 3.1.7 Validation Notes

Verify by inputting '5' and pressing the 'n!' button. The result must be exactly 120.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Calculate factorial of zero

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user has entered the number '0' into the calculator

### 3.2.5 When

The user activates the factorial '!' operation

### 3.2.6 Then

The calculator displays the result '1'.

### 3.2.7 Validation Notes

Verify by inputting '0' and pressing the 'n!' button. The result must be exactly 1, as 0! is defined as 1.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Use factorial as part of a larger expression

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The user is building a complex expression

### 3.3.5 When

The user inputs the expression '10! / 6!'

### 3.3.6 Then

The calculator displays the result '5040'.

### 3.3.7 Validation Notes

Verify that the expression parser correctly handles the factorial operator's high precedence. 10! = 3628800, 6! = 720. 3628800 / 720 = 5040.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to calculate factorial of a negative number

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The user has entered the expression '(-4)!'

### 3.4.5 When

The user attempts to evaluate the expression

### 3.4.6 Then

The system displays a clear, non-destructive error message such as 'Error: Factorial of negative number' and the original input '(-4)!' is preserved in the input field.

### 3.4.7 Validation Notes

As per REQ-FRC-001, error messages must not clear the user's input.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to calculate factorial of a non-integer

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The user has entered the expression '3.14!'

### 3.5.5 When

The user attempts to evaluate the expression

### 3.5.6 Then

The system displays a clear, non-destructive error message such as 'Error: Factorial of non-integer' and the original input '3.14!' is preserved.

### 3.5.7 Validation Notes

The factorial function is only defined for non-negative integers.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Calculate factorial of a number that exceeds standard float limits

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

The user has entered the expression '171!'

### 3.6.5 When

The user attempts to evaluate the expression

### 3.6.6 Then

The calculator displays 'Infinity'.

### 3.6.7 Validation Notes

The value of 171! is greater than JavaScript's Number.MAX_VALUE. The standard behavior is to return Infinity. This is an acceptable outcome.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

UI interaction for applying factorial

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

The user has entered the number '8' in the input display

### 3.7.5 When

The user clicks the 'n!' button

### 3.7.6 Then

The input display is updated to show '8!'.

### 3.7.7 Validation Notes

This tests the UI logic of appending the operator, not the final calculation.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated button for the factorial operation, labeled 'n!' or 'x!'.

## 4.2.0 User Interactions

- Clicking the 'n!' button appends the '!' symbol to the current number in the input expression.
- The factorial operation must be available for use in complex expressions, not just as a standalone function.

## 4.3.0 Display Requirements

- The '!' symbol must be clearly visible in the input display when used.
- Error messages related to invalid factorial operations must be displayed in the designated error area without clearing the input.

## 4.4.0 Accessibility Needs

- The 'n!' button must be fully keyboard navigable (focusable and activatable via Enter/Space).
- The button must have an appropriate ARIA label, such as 'factorial', for screen reader users, as per REQ-UI-001.

# 5.0.0 Business Rules

- {'rule_id': 'BR-FACT-001', 'rule_description': 'The factorial function is only defined for non-negative integers.', 'enforcement_point': 'During expression evaluation, before the calculation is performed.', 'violation_handling': 'The evaluation is halted, and a user-friendly error message is displayed.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Requires the core arithmetic expression parser and display to be functional before a new operator can be added.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-024

#### 6.1.2.2 Dependency Reason

Requires the non-destructive error display mechanism to be in place to handle invalid inputs.

## 6.2.0.0 Technical Dependencies

- The application's math expression parsing engine must support the addition of custom postfix unary operators.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The factorial calculation and result display must complete in under 50ms, as per REQ-NFP-001.

## 7.2.0.0 Security

- The factorial calculation is performed client-side and has no direct security implications.

## 7.3.0.0 Usability

- The 'n!' button should be logically grouped with other scientific function buttons (e.g., log, sin, cos).

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The factorial algorithm is simple (iterative loop is preferred over recursion to avoid stack overflow).
- The primary effort is integrating the '!' operator into the existing expression parser, ensuring correct operator precedence.

## 8.3.0.0 Technical Risks

- Minor risk of introducing a bug in the order of operations within the expression parser. Must be tested thoroughly with mixed operations (e.g., '2+3!').

## 8.4.0.0 Integration Points

- UI component for the calculator keypad.
- Core math expression parsing and evaluation service.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Unit test the factorial logic with valid inputs (0, 1, 5, 20), invalid inputs (-1, 1.5), and large inputs (170, 171).
- Integration test the expression parser with factorial in various positions and combinations: '5!', '5!*2', '2*5!', '(2+3)!', '10!/5!'.
- E2E test the full user flow: clicking number buttons, clicking the 'n!' button, clicking '=', and verifying the displayed result and history entry.
- Accessibility test to confirm keyboard navigation and screen reader support for the 'n!' button.

## 9.3.0.0 Test Data Needs

- Integers: 0, 1, 5, 10
- Non-integers: 2.5, 9.99
- Negative numbers: -1, -10
- Large numbers: 170 (max before infinity), 171 (infinity)

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests for the factorial function and integration tests for the parser are implemented, passing, and meet the 85% coverage requirement from REQ-NFQ-001
- E2E test scenario for the factorial feature is implemented and passing
- The 'n!' button is correctly rendered on the UI across all supported screen sizes
- Performance requirement of <50ms for calculation is verified
- Accessibility of the new button is confirmed via automated and manual checks (keyboard nav, screen reader)
- The in-app help documentation (REQ-FRC-001) is updated to include instructions for the factorial function
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a core, self-contained feature. It can be implemented by one developer within a single sprint. It is a good candidate for pairing to ensure the expression parser modifications are robust.

## 11.4.0.0 Release Impact

This is a required function for the v1.0 release to meet the definition of a 'scientific calculator'.

