# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-027 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Calculate Ohm's Law and Power values |
| As A User Story | As an electronics practitioner, I want to enter an... |
| User Persona | Electronics Practitioner (e.g., hobbyist, student,... |
| Business Value | Provides a core, high-utility feature for the targ... |
| Functional Area | Advanced Electronics Features |
| Story Theme | Specialized Calculation Modes |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Calculate Resistance and Power from Voltage and Current

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is in the Ohm's Law & Power mode and all fields are empty

### 3.1.5 When

The user enters a valid Voltage (e.g., '12V') and a valid Current (e.g., '500mA')

### 3.1.6 Then

The Resistance field is automatically calculated and populated with the correct value (e.g., '24Ω') AND the Power field is automatically calculated and populated with the correct value (e.g., '6W').

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: Calculate Current and Power from Voltage and Resistance

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user is in the Ohm's Law & Power mode and all fields are empty

### 3.2.5 When

The user enters a valid Voltage (e.g., '5V') and a valid Resistance (e.g., '1kΩ')

### 3.2.6 Then

The Current field is automatically calculated and populated with the correct value (e.g., '5mA') AND the Power field is automatically calculated and populated with the correct value (e.g., '25mW').

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Happy Path: Calculate Current and Resistance from Voltage and Power

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The user is in the Ohm's Law & Power mode and all fields are empty

### 3.3.5 When

The user enters a valid Voltage (e.g., '9V') and a valid Power (e.g., '1W')

### 3.3.6 Then

The Current field is automatically calculated and populated with the correct value (e.g., '111.11mA') AND the Resistance field is automatically calculated and populated with the correct value (e.g., '81Ω').

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Happy Path: Calculate Voltage and Power from Current and Resistance

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The user is in the Ohm's Law & Power mode and all fields are empty

### 3.4.5 When

The user enters a valid Current (e.g., '2A') and a valid Resistance (e.g., '10Ω')

### 3.4.6 Then

The Voltage field is automatically calculated and populated with the correct value (e.g., '20V') AND the Power field is automatically calculated and populated with the correct value (e.g., '40W').

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Happy Path: Calculate Voltage and Resistance from Current and Power

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

The user is in the Ohm's Law & Power mode and all fields are empty

### 3.5.5 When

The user enters a valid Current (e.g., '3A') and a valid Power (e.g., '18W')

### 3.5.6 Then

The Voltage field is automatically calculated and populated with the correct value (e.g., '6V') AND the Resistance field is automatically calculated and populated with the correct value (e.g., '2Ω').

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Happy Path: Calculate Voltage and Current from Resistance and Power

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

The user is in the Ohm's Law & Power mode and all fields are empty

### 3.6.5 When

The user enters a valid Resistance (e.g., '50Ω') and a valid Power (e.g., '2W')

### 3.6.6 Then

The Voltage field is automatically calculated and populated with the correct value (e.g., '10V') AND the Current field is automatically calculated and populated with the correct value (e.g., '200mA').

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Edge Case: Insufficient input for calculation

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

The user is in the Ohm's Law & Power mode

### 3.7.5 When

The user has entered a value in only one field (e.g., Voltage) OR has cleared all fields

### 3.7.6 Then

The other three fields remain empty and a message is displayed prompting for more information (e.g., 'Enter any two values to calculate.').

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Edge Case: User enters a third value after a calculation is complete

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

A calculation is displayed, with two user-entered values and two system-calculated values

### 3.8.5 When

The user enters a value into a third field

### 3.8.6 Then

The two previously calculated fields are cleared, and the system waits for the user to remove one of the three inputs to proceed with a new calculation.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

Edge Case: Division by zero scenario

### 3.9.3 Scenario Type

Edge_Case

### 3.9.4 Given

The user is in the Ohm's Law & Power mode

### 3.9.5 When

The user enters values that would result in division by zero (e.g., V='5V', I='0A')

### 3.9.6 Then

The system displays a mathematically correct and user-friendly result for Resistance (e.g., '∞' or 'Infinity') and Power is calculated correctly (e.g., '0W').

## 3.10.0 Criteria Id

### 3.10.1 Criteria Id

AC-010

### 3.10.2 Scenario

Alternative Flow: User clears an input field

### 3.10.3 Scenario Type

Alternative_Flow

### 3.10.4 Given

A calculation is displayed, with two user-entered values and two system-calculated values

### 3.10.5 When

The user clears one of the two user-entered values

### 3.10.6 Then

The two system-calculated fields are cleared, and the 'insufficient input' message is displayed.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Four text input fields labeled 'Voltage (V)', 'Current (I)', 'Resistance (R)', and 'Power (P)'.
- Unit indicators (V, A, Ω, W) next to or inside each respective field.
- A dedicated message area to display prompts or status text.
- A 'Clear' or 'Reset' button to empty all four fields.

## 4.2.0 User Interactions

- Calculations are triggered automatically in real-time as the user types or when an input field loses focus (onBlur).
- Calculated fields should be visually distinct from user-input fields (e.g., read-only, different background color) to prevent accidental editing.
- Users can seamlessly switch between input fields using the Tab key.

## 4.3.0 Display Requirements

- Calculated results should be formatted using engineering notation as per user settings (REQ-FRC-001).
- The UI must clearly indicate which two values are user-provided and which two are calculated.

## 4.4.0 Accessibility Needs

- All input fields must have `aria-label` attributes and be associated with a visible `<label>`.
- Color contrast between input text, background, and calculated field background must meet WCAG 2.1 AA standards.
- Status messages (e.g., 'Enter two values') must be announced by screen readers using ARIA live regions.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-FRE-001

### 5.1.2 Rule Description

A calculation can only be performed when exactly two of the four fields (V, I, R, P) contain valid numerical data.

### 5.1.3 Enforcement Point

Client-side, before triggering the calculation function.

### 5.1.4 Violation Handling

The system displays a prompt for more information and does not perform a calculation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-BIZ-003

### 5.2.2 Rule Description

Resistance (R) must be a positive number.

### 5.2.3 Enforcement Point

Client-side validation on input.

### 5.2.4 Violation Handling

A validation error message is displayed next to the Resistance field, and no calculation is performed. (Corresponds to REQ-BIZ-001)

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-BIZ-004

### 5.3.2 Rule Description

Power (P) must be a non-negative number.

### 5.3.3 Enforcement Point

Client-side validation on input.

### 5.3.4 Violation Handling

A validation error message is displayed next to the Power field, and no calculation is performed. (Corresponds to REQ-BIZ-001)

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-014

#### 6.1.1.2 Dependency Reason

This story requires the input parsing logic that handles SI prefixes (k, m, μ, etc.) to be available for user inputs.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-XXX

#### 6.1.2.2 Dependency Reason

A story for the main application shell and mode-switching UI must be complete to provide a location for this feature.

## 6.2.0.0 Technical Dependencies

- The application's shared numerical input component.
- The application's client-side state management solution (e.g., Redux Toolkit).
- A utility library for handling arbitrary-precision arithmetic to avoid floating-point errors.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- All client-side calculations and subsequent UI updates must complete in under 50ms as per REQ-NFP-001.

## 7.2.0.0 Security

- Input fields must be sanitized to prevent Cross-Site Scripting (XSS) attacks, although the risk is low with numerical inputs.

## 7.3.0.0 Usability

- The interface must be intuitive, requiring no user training to operate. Feedback (prompts, calculated values, errors) must be immediate and clear.

## 7.4.0.0 Accessibility

- The feature must be fully compliant with WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- The feature must function correctly on all browsers specified in REQ-ENV-001 (latest Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Managing the interconnected state of four input fields.
- Implementing the real-time calculation logic with debouncing to ensure good performance.
- Handling all six possible calculation paths and various edge cases (zeroes, infinity).
- Integrating the SI prefix parsing logic into the input fields.
- Ensuring the UI is responsive and accessible.

## 8.3.0.0 Technical Risks

- Potential for floating-point inaccuracies with certain calculations; a library like `decimal.js` should be considered.
- Performance issues on older devices if `onChange` events are not properly debounced.

## 8.4.0.0 Integration Points

- This component will be integrated into the main application's mode-switching router/view.
- It will utilize the shared SI prefix parsing utility.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Component
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify all 6 happy-path calculation combinations with and without SI prefixes.
- Test with zero, negative, and very large/small numbers.
- Test the UI flow for entering 1, 2, and 3 values to ensure correct state transitions.
- Test clearing and resetting the form.
- Automated accessibility checks for labels, roles, and color contrast.

## 9.3.0.0 Test Data Needs

- A matrix of input pairs and their expected outputs.
- Examples of inputs with all supported SI prefixes (p, n, μ, m, k, M, G).
- Invalid data (e.g., negative resistance, non-numeric strings).

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for E2E tests.
- Axe-core for automated accessibility testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and component tests implemented with >90% coverage for the calculation logic
- E2E tests covering the primary user flows are passing
- User interface reviewed and approved by UX/Product Owner
- Performance requirement ( <50ms UI update) verified
- Accessibility audit (automated and manual) passed against WCAG 2.1 AA
- Feature is successfully deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a cornerstone of the electronics features and should be prioritized early.
- Ensure dependency US-014 (SI Prefixes) is completed in a prior or concurrent sprint.

## 11.4.0.0 Release Impact

- This feature is critical for the initial launch (v1.0) to meet the project's scope of being an 'electronics calculator'.

