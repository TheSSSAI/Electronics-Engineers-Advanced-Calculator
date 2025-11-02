# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-030 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Calculate total resistance of resistors in Series |
| As A User Story | As an electronics hobbyist, I want to press a 'Cal... |
| User Persona | Electronics Hobbyist, Electronics Engineering Stud... |
| Business Value | Enhances the application's utility as a specialize... |
| Functional Area | Advanced Electronics Features |
| Story Theme | Resistor Calculations |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Calculate series resistance for multiple valid resistors

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am in the 'Resistor Combinations' mode and have added the following valid resistor values to the list: '1k', '2.2k', '470'

### 3.1.5 When

I press the 'Calculate Series' button

### 3.1.6 Then

The system calculates the total resistance as 3670 Ohms

### 3.1.7 And

The result is displayed clearly in a designated output field, formatted as 'Total Series Resistance: 3.67 kΩ'.

### 3.1.8 Validation Notes

Verify the calculation is correct (1000 + 2200 + 470 = 3670). Verify the output is formatted using the appropriate SI prefix and unit symbol.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Edge Case: Calculate series resistance with an empty list

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

I am in the 'Resistor Combinations' mode and the list of resistors is empty

### 3.2.5 When

I press the 'Calculate Series' button

### 3.2.6 Then

The total series resistance is displayed as '0 Ω'.

### 3.2.7 Validation Notes

The system should handle an empty set gracefully without errors and display a mathematically correct result.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Edge Case: Calculate series resistance with a single resistor in the list

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

I am in the 'Resistor Combinations' mode and have added a single resistor value of '4.7M' to the list

### 3.3.5 When

I press the 'Calculate Series' button

### 3.3.6 Then

The total series resistance is displayed as '4.7 MΩ'.

### 3.3.7 Validation Notes

The result should be identical to the single value in the list, correctly formatted.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Alternative Flow: Recalculate series resistance after changing the list

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

I have a list with '100' and '200' and have calculated the series resistance, which shows '300 Ω'

### 3.4.5 When

I add a new resistor with a value of '300' to the list

### 3.4.6 And

I press the 'Calculate Series' button again

### 3.4.7 Then

The displayed total series resistance updates to '600 Ω'.

### 3.4.8 Validation Notes

Ensure that the calculation always uses the current state of the resistor list.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Non-Functional: UI feedback on interaction

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

I am in the 'Resistor Combinations' mode

### 3.5.5 When

I hover over the 'Calculate Series' button

### 3.5.6 Then

The button's appearance changes to indicate it is interactive.

### 3.5.7 And

When I click the button, a visual press effect occurs.

### 3.5.8 Validation Notes

Verify CSS hover and active states are applied as per the UI style guide (REQ-UI-001).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated button labeled 'Calculate Series'.
- A read-only output field or display area labeled 'Total Series Resistance' to show the calculated result.

## 4.2.0 User Interactions

- User clicks the 'Calculate Series' button to trigger the calculation.
- The result field updates automatically after the calculation is performed.
- The button must be clickable and provide visual feedback upon interaction.

## 4.3.0 Display Requirements

- The calculated result must be displayed with the correct unit symbol (Ω).
- The result should be formatted using engineering notation with appropriate SI prefixes (e.g., k, M) for readability, as per REQ-FRC-001.

## 4.4.0 Accessibility Needs

- The 'Calculate Series' button must be focusable and activatable via keyboard (Enter/Space).
- The result display area should have an `aria-live='polite'` attribute so screen readers announce the updated result.
- All UI elements must meet WCAG 2.1 Level AA contrast and labeling requirements (REQ-UI-001).

# 5.0.0 Business Rules

- {'rule_id': 'BR-RES-01', 'rule_description': 'The series resistance calculation is the arithmetic sum of all resistor values in the list (R_total = R1 + R2 + ... + Rn).', 'enforcement_point': "Client-side, upon clicking the 'Calculate Series' button.", 'violation_handling': 'Not applicable as this is a calculation rule. Input validation is handled by US-033.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-032

#### 6.1.1.2 Dependency Reason

This story requires the UI and logic for creating and managing a list of resistor values to be implemented first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-033

#### 6.1.2.2 Dependency Reason

This story assumes that the resistor list only contains valid (positive, non-zero) numerical values. US-033 is responsible for enforcing this input validation.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-014

#### 6.1.3.2 Dependency Reason

The calculation logic must correctly parse user inputs containing SI prefixes (e.g., '1.5k' -> 1500).

## 6.2.0.0 Technical Dependencies

- A shared utility function for parsing numbers with SI prefixes.
- A shared utility function for formatting numbers into engineering notation.

## 6.3.0.0 Data Dependencies

- Access to the current list of resistor values managed by the 'Resistor Combinations' mode's state.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The calculation and UI update must complete in under 50ms, as this is a client-side operation (REQ-NFP-001).

## 7.2.0.0 Security

- Not applicable. This is a pure client-side calculation with no backend communication or sensitive data handling.

## 7.3.0.0 Usability

- The function should be discoverable and the result clearly presented to avoid user confusion.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The core calculation is a simple array summation.
- Depends on pre-existing components for input and display.
- Relies on shared utility functions for parsing and formatting, which may need to be created if not already available.

## 8.3.0.0 Technical Risks

- Minor risk of incorrect calculations if the SI prefix parsing or floating-point arithmetic is not handled carefully.

## 8.4.0.0 Integration Points

- Integrates with the state management of the 'Resistor Combinations' UI component.
- Utilizes the application's global number parsing and formatting utilities.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Component Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Test calculation with integers, floats, and mixed values.
- Test calculation with values using various SI prefixes (k, M, G).
- Test UI response to empty list, single-item list, and multi-item list.
- Verify keyboard navigation and screen reader announcements for the button and result field.

## 9.3.0.0 Test Data Needs

- A set of resistor lists and their expected series sum.
- Examples: [10, 20, 30] -> 60; [1.5k, 3.3k] -> 4.8k; [1M, 220k, 47k] -> 1.267M

## 9.4.0.0 Testing Tools

- Jest & React Testing Library for unit/component tests.
- Cypress for E2E tests.
- Axe for accessibility audits.

# 10.0.0.0 Definition Of Done

- All acceptance criteria are validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests for the calculation logic have been written and achieve >90% coverage.
- Component tests for the UI interaction have been written and are passing.
- End-to-end tests simulating the full user flow are passing.
- Accessibility checks (automated and manual) have been completed and passed.
- All dependencies (US-032, US-033) are completed and verified.
- No new high-priority bugs have been introduced.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story must be scheduled in a sprint after or concurrent with US-032 and US-033, provided they are completed first.
- Can be paired with US-031 ('Calculate Parallel') as they share the same context and dependencies.

## 11.4.0.0 Release Impact

This is a core feature of the 'Resistor Combinations' mode. The mode cannot be considered complete without it.

