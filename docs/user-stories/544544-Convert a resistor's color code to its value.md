# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-036 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Convert a resistor's color code to its value |
| As A User Story | As an Electronics Practitioner (student, hobbyist,... |
| User Persona | Electronics Practitioner (e.g., student, hobbyist,... |
| Business Value | Increases the application's utility as a comprehen... |
| Functional Area | Advanced Electronics Features |
| Story Theme | Resistor Calculation Tools |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Calculate a standard 4-band resistor value

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is in the 'Resistor Color Code' mode and has selected the '4-band' resistor type

### 3.1.5 When

The user selects 'Brown' for Band 1, 'Black' for Band 2, 'Red' for Band 3 (Multiplier), and 'Gold' for Band 4 (Tolerance)

### 3.1.6 Then

The system displays the resistance value as '1 kΩ' and the tolerance as '±5%'

### 3.1.7 Validation Notes

Verify the output fields update in real-time as the final color is selected. The Temperature Coefficient field should not be visible.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Calculate a precision 5-band resistor value

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user is in the 'Resistor Color Code' mode and has selected the '5-band' resistor type

### 3.2.5 When

The user selects 'Orange' for Band 1, 'Orange' for Band 2, 'Black' for Band 3, 'Brown' for Band 4 (Multiplier), and 'Brown' for Band 5 (Tolerance)

### 3.2.6 Then

The system displays the resistance value as '3.3 kΩ' and the tolerance as '±1%'

### 3.2.7 Validation Notes

Verify the output fields update correctly. The Temperature Coefficient field should not be visible.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Calculate a 6-band resistor value with temperature coefficient

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The user is in the 'Resistor Color Code' mode and has selected the '6-band' resistor type

### 3.3.5 When

The user selects 'Red' for Band 1, 'Violet' for Band 2, 'Green' for Band 3, 'Orange' for Band 4 (Multiplier), 'Gold' for Band 5 (Tolerance), and 'Brown' for Band 6 (TempCo)

### 3.3.6 Then

The system displays the resistance value as '2.75 MΩ', the tolerance as '±5%', and the Temperature Coefficient as '100 ppm/°C'

### 3.3.7 Validation Notes

Verify all three output fields are visible and display the correct calculated values.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Calculate a 3-band resistor value with default tolerance

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The user is in the 'Resistor Color Code' mode and has selected the '3-band' resistor type

### 3.4.5 When

The user selects 'Yellow' for Band 1, 'Violet' for Band 2, and 'Orange' for Band 3 (Multiplier)

### 3.4.6 Then

The system displays the resistance value as '47 kΩ' and the tolerance as '±20%'

### 3.4.7 Validation Notes

The tolerance for a 3-band resistor is implicitly 20%. This should be displayed automatically. TempCo field should not be visible.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

UI updates correctly when switching resistor type

### 3.5.3 Scenario Type

Alternative_Flow

### 3.5.4 Given

The user has selected colors for a 4-band resistor and values are displayed

### 3.5.5 When

The user changes the resistor type selector from '4-band' to '6-band'

### 3.5.6 Then

The UI updates to show 6 color selectors, all color selections are reset to their default state, and all calculated value fields are cleared or reset

### 3.5.7 Validation Notes

Test switching between all band types (3, 4, 5, 6) to ensure the UI state is managed correctly and no old values persist.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Invalid color options are not available for selection

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

The user is in the 'Resistor Color Code' mode

### 3.6.5 When

The user opens the color selector for Band 1 (first significant digit)

### 3.6.6 Then

The color options for 'Gold', 'Silver', and 'None' are not present or are disabled

### 3.6.7 Validation Notes

Verify that each band's color palette is filtered according to the EIA standard. For example, the Tolerance band should not show colors like 'Orange'.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Full keyboard navigation and screen reader support

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

The 'Resistor Color Code' mode is active

### 3.7.5 When

A user navigates using the Tab key and interacts using Enter/Space

### 3.7.6 Then

The focus moves logically from the band-type selector to each color band selector in order, and a screen reader correctly announces the label, role, and current value of each control and result field

### 3.7.7 Validation Notes

This must comply with WCAG 2.1 Level AA standards as per REQ-UI-001.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Radio button group or Dropdown to select resistor type (3, 4, 5, or 6-band).
- A set of color selectors (e.g., dropdowns or color palettes), one for each band, dynamically updated based on the selected resistor type.
- Read-only text fields to display the calculated 'Resistance Value', 'Tolerance', and 'Temperature Coefficient'.
- Optional: A visual graphic of a resistor that updates its band colors as the user makes selections.

## 4.2.0 User Interactions

- Selecting a resistor type (e.g., '5-band') immediately updates the UI to show the corresponding number of color selectors.
- Changing a color in any band selector triggers an immediate, real-time recalculation and update of the displayed result fields.
- Hovering over a color option could show its corresponding value in a tooltip (e.g., hovering over 'Red' in the multiplier band shows 'x100').

## 4.3.0 Display Requirements

- The calculated resistance must be formatted with appropriate SI prefixes (e.g., 'kΩ', 'MΩ') as per REQ-FRC-001.
- Tolerance must be displayed with a '±' prefix and '%' suffix (e.g., '±5%').
- Temperature Coefficient must be displayed with its unit (e.g., 'ppm/°C').
- The Temperature Coefficient field should only be visible when a 6-band resistor is selected.

## 4.4.0 Accessibility Needs

- All controls must have `aria-labels` for screen readers.
- Color selectors must be fully operable via keyboard.
- Sufficient color contrast must be used for text and UI elements, as per WCAG 2.1 AA.
- Calculated results should be announced to screen readers upon update.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-RCC-001

### 5.1.2 Rule Description

The calculation logic must strictly adhere to the EIA standard color codes for resistors.

### 5.1.3 Enforcement Point

Client-side calculation logic.

### 5.1.4 Violation Handling

N/A - This is a core logic requirement, not a user-input validation rule.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-RCC-002

### 5.2.2 Rule Description

A 3-band resistor has an implicit tolerance of ±20%.

### 5.2.3 Enforcement Point

Client-side calculation logic.

### 5.2.4 Violation Handling

The system must automatically display '±20%' when the 3-band type is selected and the first two bands have valid colors.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-XXX', 'dependency_reason': "A parent story that establishes the main UI for the 'Resistor Color Code' mode, including the control to select the number of bands (3, 4, 5, or 6), is required before this story can be implemented."}

## 6.2.0 Technical Dependencies

- Availability of the chosen frontend component library (e.g., Material-UI) for UI controls.
- A defined client-side data structure (e.g., JSON constant) containing the EIA color code mappings.
- Integration with the global state management solution (Redux Toolkit) to handle UI state.

## 6.3.0 Data Dependencies

- Accurate and verified EIA standard resistor color code data for values, multipliers, tolerances, and temperature coefficients.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- UI updates and recalculations upon color selection must be visually instantaneous, completing in under 50ms as per REQ-NFP-001.

## 7.2.0 Security

- As this feature is entirely client-side, there are no specific security requirements beyond the application's overall security posture (e.g., CSP headers).

## 7.3.0 Usability

- The interface should be highly intuitive, allowing a user to perform a conversion with minimal clicks and no ambiguity.
- The visual layout should clearly associate each color selector with its corresponding band on a resistor diagram.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0 Compatibility

- The feature must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge) and be fully responsive on mobile and desktop viewports as per REQ-ENV-001.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- The calculation logic is a simple table lookup and string concatenation/multiplication.
- UI state management is required to handle the dynamic number of bands.
- Filtering the available colors for each specific band selector adds minor complexity.

## 8.3.0 Technical Risks

- Implementing a fully accessible custom color picker can be challenging. Using standard, styled dropdowns is the lower-risk approach.
- Potential for errors if the EIA color code data is transcribed incorrectly.

## 8.4.0 Integration Points

- This component will be integrated into the main view for the 'Advanced Electronics Features' section of the application.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Component
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify calculations for at least two different examples for each resistor type (3, 4, 5, and 6-band).
- Verify the UI correctly resets when switching between band types.
- Verify keyboard-only navigation and operation.
- Verify screen reader announcements for controls and results.
- Verify responsive layout on small, medium, and large screen sizes.

## 9.3.0 Test Data Needs

- A set of known resistor color combinations and their expected values to use as test assertions.

## 9.4.0 Testing Tools

- Jest
- React Testing Library
- Cypress
- Axe for accessibility scanning

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and component tests implemented for calculation logic and UI state, achieving >85% code coverage
- E2E tests for the primary user flow are implemented and passing
- User interface is responsive and approved by the design/product owner
- Performance requirement of <50ms for UI updates is met
- Accessibility audit (automated and manual) passed against WCAG 2.1 AA
- All code is merged into the main development branch
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

3

## 11.2.0 Priority

🟡 Medium

## 11.3.0 Sprint Considerations

- This story is self-contained and has no external blockers, making it a good candidate for any sprint.
- It can be developed in parallel with other electronics calculator modes.

## 11.4.0 Release Impact

- Completes one half of the Resistor Color Code feature set. Should ideally be released alongside its counterpart, US-034 (Value-to-Color).

