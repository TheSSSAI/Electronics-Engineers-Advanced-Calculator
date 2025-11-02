# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-002 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Use trigonometric functions |
| As A User Story | As a scientific or technical user (e.g., student, ... |
| User Persona | Any user of the scientific calculator, including s... |
| Business Value | Provides fundamental scientific functionality, ful... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Scientific Operations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Calculate sine in Degrees mode

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the calculator angle mode is set to 'Degrees'

### 3.1.5 When

the user enters '90' and applies the 'sin' function

### 3.1.6 Then

the displayed result is '1'.

### 3.1.7 Validation Notes

Verify that Math.sin(90 * Math.PI / 180) is calculated and the result is correctly displayed.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Calculate cosine in Degrees mode

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the calculator angle mode is set to 'Degrees'

### 3.2.5 When

the user enters '180' and applies the 'cos' function

### 3.2.6 Then

the displayed result is '-1'.

### 3.2.7 Validation Notes

Verify that Math.cos(180 * Math.PI / 180) is calculated and the result is correctly displayed.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Calculate tangent in Degrees mode

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the calculator angle mode is set to 'Degrees'

### 3.3.5 When

the user enters '45' and applies the 'tan' function

### 3.3.6 Then

the displayed result is '1'.

### 3.3.7 Validation Notes

Verify that Math.tan(45 * Math.PI / 180) is calculated and the result is correctly displayed.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Calculate sine in Radians mode

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the calculator angle mode is set to 'Radians'

### 3.4.5 When

the user enters the expression for 'π/2' and applies the 'sin' function

### 3.4.6 Then

the displayed result is '1'.

### 3.4.7 Validation Notes

Requires the Pi constant from US-009. Verify that Math.sin(Math.PI / 2) is calculated.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Calculate cosine in Radians mode

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the calculator angle mode is set to 'Radians'

### 3.5.5 When

the user enters the expression for 'π' and applies the 'cos' function

### 3.5.6 Then

the displayed result is '-1'.

### 3.5.7 Validation Notes

Requires the Pi constant from US-009. Verify that Math.cos(Math.PI) is calculated.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Calculate tangent in Radians mode

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the calculator angle mode is set to 'Radians'

### 3.6.5 When

the user enters the expression for 'π/4' and applies the 'tan' function

### 3.6.6 Then

the displayed result is '1'.

### 3.6.7 Validation Notes

Requires the Pi constant from US-009. Verify that Math.tan(Math.PI / 4) is calculated.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Calculate sine in Gradians mode

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

the calculator angle mode is set to 'Gradians'

### 3.7.5 When

the user enters '100' and applies the 'sin' function

### 3.7.6 Then

the displayed result is '1'.

### 3.7.7 Validation Notes

Verify that Math.sin(100 * Math.PI / 200) is calculated and the result is correctly displayed.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Handle undefined tangent calculation

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

the calculator angle mode is set to 'Degrees'

### 3.8.5 When

the user attempts to calculate 'tan(90)'

### 3.8.6 Then

the system displays a clear error message (e.g., 'Error: Undefined') and the original input 'tan(90)' is preserved in the input field.

### 3.8.7 Validation Notes

Verify that the application does not crash and provides user-friendly feedback as per REQ-FRC-001.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated button for 'sin'
- A dedicated button for 'cos'
- A dedicated button for 'tan'

## 4.2.0 User Interactions

- Clicking a trigonometric function button applies the function to the current number or expression result.
- The function name (e.g., 'sin(') is prepended to the number in the input display.

## 4.3.0 Display Requirements

- The currently active angle mode ('DEG', 'RAD', or 'GRAD') must be persistently visible in the calculator UI, as specified in US-008.

## 4.4.0 Accessibility Needs

- All trigonometric function buttons must have ARIA labels (e.g., 'aria-label="sine"') for screen reader compatibility.
- Buttons must be included in the keyboard navigation order and be activatable with Enter/Space keys.

# 5.0.0 Business Rules

- {'rule_id': 'BR-002', 'rule_description': 'The output of all trigonometric functions must be calculated based on the currently selected angle mode (Degrees, Radians, or Gradians).', 'enforcement_point': 'Client-side calculation engine, at the moment a trigonometric function is evaluated.', 'violation_handling': 'Incorrect calculation results. This is a functional bug, not a user-input violation.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Requires the basic arithmetic and expression evaluation engine to be in place.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-007

#### 6.1.2.2 Dependency Reason

CRITICAL: The logic for switching angle modes must be implemented as the output of trig functions depends entirely on it.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-008

#### 6.1.3.2 Dependency Reason

CRITICAL: The UI for displaying the current angle mode must exist so the user can correctly interpret the results.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-009

#### 6.1.4.2 Dependency Reason

Required to accurately test and use the functions in Radians mode with the Pi (π) constant.

### 6.1.5.0 Story Id

#### 6.1.5.1 Story Id

US-024

#### 6.1.5.2 Dependency Reason

Requires the system's defined error handling mechanism for displaying messages for invalid operations like tan(90).

## 6.2.0.0 Technical Dependencies

- A reliable math library (e.g., JavaScript's native `Math` object).
- The application's state management solution (e.g., Redux Toolkit) to access the current angle mode.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- All trigonometric calculations must be visually instantaneous, completing in under 50ms as per REQ-NFP-001.

## 7.2.0.0 Security

- All calculation logic is client-side, so no specific security requirements beyond the application's overall security posture.

## 7.3.0.0 Usability

- Function buttons should be grouped logically with other scientific functions.
- The dependency on the angle mode should be intuitive due to the clear display of the active mode.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as per REQ-UI-001.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Logic relies on standard, built-in math functions.
- Primary task is to correctly read the angle mode from the application state and apply the appropriate conversion (e.g., degrees to radians) before calling the function.

## 8.3.0.0 Technical Risks

- Potential for floating-point precision errors in edge cases, which is a common issue in computer arithmetic. Results should be rounded to a reasonable number of decimal places for display.
- Incorrect state management integration could lead to calculations being performed in the wrong angle mode.

## 8.4.0.0 Integration Points

- Integrates with the central calculation engine/parser.
- Integrates with the state management store to get the current angle mode.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Component
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify sin, cos, and tan calculations for standard angles (0, 30, 45, 60, 90, 180) in all three angle modes.
- Verify calculations for negative input values.
- Verify calculations for values greater than 360 degrees (or 2π radians / 400 gradians).
- Verify the error handling for tan(90 deg), tan(270 deg), etc.
- Verify keyboard accessibility for all new buttons.

## 9.3.0.0 Test Data Needs

- A set of known input/output pairs for trigonometric functions in all three angle modes.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests for the calculation logic implemented with >90% coverage
- Component tests for the UI buttons are implemented and passing
- E2E tests for the primary scenarios in all three angle modes are passing
- User interface elements are reviewed and confirmed to meet accessibility standards (WCAG 2.1 AA)
- Functionality is verified on all target browsers
- No regressions introduced to existing calculator functionality
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the implementation of angle mode switching and display (US-007, US-008). It should be scheduled in the same sprint as or a subsequent sprint to those stories.

## 11.4.0.0 Release Impact

- This is a fundamental feature for the initial release (v1.0). The application cannot be marketed as a 'scientific calculator' without it.

