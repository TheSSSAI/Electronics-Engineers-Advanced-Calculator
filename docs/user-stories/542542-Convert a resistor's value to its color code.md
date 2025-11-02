# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-034 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Convert a resistor's value to its color code |
| As A User Story | As an electronics hobbyist or engineer, I want to ... |
| User Persona | Electronics Hobbyist, Electronics Engineering Stud... |
| Business Value | Increases the application's utility for the target... |
| Functional Area | Advanced Electronics Features |
| Story Theme | Resistor Calculation Tools |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful conversion for a standard 4-band resistor

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function and '4-band' resistor type

### 3.1.5 When

the user enters '220' in the resistance value field and selects '±5%' from the tolerance dropdown

### 3.1.6 Then

the system must display a visual representation of the resistor with the color sequence: Red, Red, Brown, Gold.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successful conversion for a 5-band resistor using SI prefix

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function and '5-band' resistor type

### 3.2.5 When

the user enters '4.7k' in the resistance value field and selects '±1%' from the tolerance dropdown

### 3.2.6 Then

the system must display a visual representation of the resistor with the color sequence: Yellow, Violet, Black, Brown, Brown.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Successful conversion for a 3-band resistor

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function and '3-band' resistor type

### 3.3.5 When

the user enters '1000' in the resistance value field

### 3.3.6 Then

the tolerance dropdown must be disabled or hidden, and the system must display the color sequence: Brown, Black, Red.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Successful conversion for a 6-band resistor

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function and '6-band' resistor type

### 3.4.5 When

the user enters '100' in the resistance value field, selects '±2%' tolerance, and selects '50 ppm/K' Temperature Coefficient

### 3.4.6 Then

the system must display the color sequence: Brown, Black, Brown, Red, Red.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

System suggests nearest standard value for non-standard input

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function

### 3.5.5 When

the user enters a non-standard resistance value, such as '480'

### 3.5.6 Then

the system must calculate and display the color code for '480' AND display a non-blocking message suggesting the nearest standard E-series value, e.g., 'Nearest standard E24 value: 470Ω'.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

System handles invalid non-numeric resistance input

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function

### 3.6.5 When

the user enters 'abc' into the resistance value field

### 3.6.6 Then

the input field must display a validation error, the calculation is not performed, and a message like 'Invalid number' is shown.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

System handles invalid negative resistance input

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

the user is in the 'Resistor Color Code' mode and has selected the 'Value-to-Color' function

### 3.7.5 When

the user enters '-100' into the resistance value field

### 3.7.6 Then

the input field must display a validation error, the calculation is not performed, and a message like 'Resistance must be positive' is shown.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Segmented control or radio buttons to select resistor type: 3, 4, 5, or 6-band.
- A text input field for 'Resistance Value' that accepts numbers, decimal points, and SI prefixes.
- A dropdown menu for 'Tolerance' populated with standard values (e.g., ±1%, ±2%, ±5%, ±10%).
- A dropdown menu for 'Temperature Coefficient (TCR)' (visible only for 6-band resistors).
- A visual display area showing a graphical representation of a resistor with correctly colored bands.
- A text area for displaying the nearest standard E-series value suggestion.

## 4.2.0 User Interactions

- Selecting a resistor type (e.g., 6-band) dynamically shows/hides relevant input fields (e.g., TCR dropdown).
- The color band display updates automatically and instantly as the user modifies any input value (resistance, tolerance, etc.).
- Input validation provides immediate visual feedback for invalid entries.

## 4.3.0 Display Requirements

- The color bands must be clearly distinguishable and rendered in the correct sequence.
- The active resistor type (3, 4, 5, or 6-band) must be clearly indicated.

## 4.4.0 Accessibility Needs

- All input fields, dropdowns, and controls must be fully keyboard navigable (WCAG 2.1).
- Color bands should have a text label (e.g., in a tooltip or aria-label) for screen reader users.
- Sufficient color contrast must be used for all text and UI elements.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-RES-001

### 5.1.2 Rule Description

Resistance value must be a positive, non-zero number.

### 5.1.3 Enforcement Point

Client-side validation on input field.

### 5.1.4 Violation Handling

Display an inline validation error message and prevent calculation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-RES-002

### 5.2.2 Rule Description

The system must correctly parse standard SI prefixes (p, n, μ, m, k, M, G) for resistance values.

### 5.2.3 Enforcement Point

Client-side input parsing logic.

### 5.2.4 Violation Handling

Treat input as invalid if prefix is malformed or not recognized.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-RES-003

### 5.3.2 Rule Description

For non-standard resistance values, the nearest standard E-series (E24) value must be suggested.

### 5.3.3 Enforcement Point

Client-side calculation logic, triggered after a valid number is entered.

### 5.3.4 Violation Handling

N/A - This is a helpful suggestion, not an error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-014

#### 6.1.1.2 Dependency Reason

Requires the shared logic for parsing numbers with SI prefixes.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

EPIC-FRE-001

#### 6.1.2.2 Dependency Reason

Requires the parent UI shell/framework for the 'Advanced Electronics Features' modes to be in place.

## 6.2.0.0 Technical Dependencies

- Availability of the chosen UI component library (Material-UI).
- A defined data module/utility containing the mappings for color values, multipliers, tolerances, TCRs, and E-series values.

## 6.3.0.0 Data Dependencies

- A definitive list of standard E-series resistor values (at least up to E24) must be available within the application.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- UI updates, including color band recalculation, must complete in under 50ms after user input to feel instantaneous, as per REQ-NFP-001.

## 7.2.0.0 Security

- All input is handled on the client-side; no server-side execution is required for this feature. Standard XSS prevention measures for React must be in place.

## 7.3.0.0 Usability

- The tool should be intuitive, requiring no instructions for a user familiar with resistor color codes.
- The visual representation of the resistor should be clear and unambiguous.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards, as specified in REQ-UI-001.

## 7.5.0.0 Compatibility

- Must function correctly on all browsers specified in REQ-ENV-001 (latest Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The logic to convert an arbitrary number into the correct significant digits and multiplier band is non-trivial.
- Implementing the algorithm to find the 'nearest standard E-series value' requires careful logic.
- Creating a clean, responsive, and accessible visual representation of the resistor with dynamic bands.

## 8.3.0.0 Technical Risks

- Potential for off-by-one errors in the multiplier calculation logic.
- Ensuring the E-series lookup algorithm is both correct and performant.

## 8.4.0.0 Integration Points

- This feature will be a component within the larger 'Resistor Color Code' mode, which itself is part of the main application's mode-switching system.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Component
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Test with a wide range of values for each band type (3, 4, 5, 6).
- Test boundary conditions (e.g., values just below/above a multiplier change).
- Test all supported SI prefixes.
- Test the 'nearest value' suggestion with values that are exactly halfway between two standard values.
- Verify UI responsiveness on mobile, tablet, and desktop viewports.
- Perform automated accessibility checks using tools like Axe.

## 9.3.0.0 Test Data Needs

- A list of known resistor values and their correct color codes for test case validation.
- A list of non-standard values and their expected 'nearest standard' suggestions.

## 9.4.0.0 Testing Tools

- Jest
- React Testing Library
- Cypress
- Axe for accessibility

# 10.0.0.0 Definition Of Done

- All acceptance criteria are validated and passing in the staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests for conversion logic and helper functions achieve at least 90% code coverage.
- React component tests are implemented for the UI, covering user interactions and validation.
- An end-to-end test script successfully validates the primary user flow.
- The UI has been reviewed for consistency with the style guide and for responsiveness.
- Automated and manual accessibility checks confirm WCAG 2.1 AA compliance.
- The feature is documented in the in-app help system as per REQ-FRC-001.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be developed in conjunction with US-036 ('Color-to-Value') as they share the same UI context and data models. They could potentially be done by the same developer in the same sprint.
- The shared utility for SI prefix parsing (from US-014) must be complete and available.

## 11.4.0.0 Release Impact

This is a key feature for the electronics-focused functionality of the application. Its completion is critical for a successful launch to the target audience.

