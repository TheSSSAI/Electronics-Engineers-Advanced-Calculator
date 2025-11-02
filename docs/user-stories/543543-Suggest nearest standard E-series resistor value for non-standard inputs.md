# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-035 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Suggest nearest standard E-series resistor value f... |
| As A User Story | As an electronics designer using the Value-to-Colo... |
| User Persona | Electronics Engineer, Electronics Hobbyist, or Stu... |
| Business Value | Enhances the tool's utility from a simple converte... |
| Functional Area | Advanced Electronics Features |
| Story Theme | Resistor Color Code Converter |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Suggestion for a non-standard value

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is on the 'Resistor Color Code' mode's 'Value-to-Color' tab and has selected a 5% tolerance (which maps to the E24 series).

### 3.1.5 When

The user enters a non-standard resistance value, such as '480', into the value input field and the field loses focus.

### 3.1.6 Then

A non-blocking suggestion text, such as 'Nearest standard value: 470 Ω', is displayed clearly near the input field.

### 3.1.7 Validation Notes

Verify that for input 480 and 5% tolerance, the suggestion is 470. The calculation must correctly identify the closest value in the E24 series.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

No suggestion for a standard value

### 3.2.3 Scenario Type

Alternative_Flow

### 3.2.4 Given

The user is on the 'Value-to-Color' tab and has selected a 10% tolerance (E12 series).

### 3.2.5 When

The user enters a value that is a standard value for that series, such as '3300', and the field loses focus.

### 3.2.6 Then

No suggestion text is displayed.

### 3.2.7 Validation Notes

Verify that entering standard values for the selected E-series does not trigger the suggestion UI.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Accepting the suggested value

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

A suggestion, 'Nearest standard value: 470 Ω', is displayed.

### 3.3.5 When

The user clicks on the suggestion text or activates it with the keyboard.

### 3.3.6 Then

The resistance value input field is updated to '470'.

### 3.3.7 And

The suggestion text disappears.

### 3.3.8 Validation Notes

Test the click and keyboard (Enter key) interaction. Confirm the application state (input value, color bands) updates correctly.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Suggestion updates when tolerance is changed

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

The user has entered '101' in the resistance field with 5% tolerance (E24) selected, and a suggestion for '100 Ω' is visible.

### 3.4.5 When

The user changes the tolerance dropdown to 1% (which maps to the E96 series).

### 3.4.6 Then

The suggestion text immediately updates to 'Nearest standard value: 102 Ω'.

### 3.4.7 Validation Notes

Verify that the suggestion logic re-evaluates when the tolerance, and thus the underlying E-series, changes.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Handling values exactly between two standard values

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

The user is on the 'Value-to-Color' tab with 5% tolerance (E24 series) selected.

### 3.5.5 When

The user enters a value that is equidistant from two standard values, such as '490' (midway between 470 and 510), and the field loses focus.

### 3.5.6 Then

The system consistently suggests the lower of the two values, displaying 'Nearest standard value: 470 Ω'.

### 3.5.7 Validation Notes

Verify the tie-breaking logic is implemented consistently. The defined rule is to round down in case of a tie.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Suggestion works across different orders of magnitude

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

The user is on the 'Value-to-Color' tab with 5% tolerance (E24 series) selected.

### 3.6.5 When

The user enters '8k' (8000) into the resistance field and the field loses focus.

### 3.6.6 Then

The system correctly suggests the nearest standard value in that magnitude, 'Nearest standard value: 8.2 kΩ'.

### 3.6.7 Validation Notes

Ensure the suggestion algorithm correctly handles SI prefixes and scales the E-series values appropriately.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A text label or clickable button to display the suggestion.
- The suggestion element must be positioned adjacent to the resistance value input field.

## 4.2.0 User Interactions

- The suggestion appears when the resistance input field loses focus (onBlur) or after a short debounce period (e.g., 500ms) of inactivity.
- The suggestion element is clickable/activatable.
- Clicking the suggestion updates the input field's value and triggers a recalculation of the color bands.

## 4.3.0 Display Requirements

- The suggestion text must be clear and unambiguous, e.g., 'Nearest standard value: 470 Ω'.
- The suggestion should be visually distinct from the input field's label and value.

## 4.4.0 Accessibility Needs

- The suggestion text must be associated with the input field using `aria-describedby` so screen readers announce it.
- If the suggestion is interactive (clickable), it must be a focusable element (like a button) and keyboard-operable (Enter/Space).
- Color contrast for the suggestion text must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-035-01

### 5.1.2 Rule Description

The E-series used for suggestions must correspond to the selected tolerance value (e.g., 20%->E6, 10%->E12, 5%->E24, 2%->E48, 1%->E96).

### 5.1.3 Enforcement Point

Client-side logic when calculating the suggestion.

### 5.1.4 Violation Handling

If no mapping exists, no suggestion is shown. This should not occur with valid UI options.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-035-02

### 5.2.2 Rule Description

If an input value is equidistant between two standard values, the lower standard value shall be suggested.

### 5.2.3 Enforcement Point

Client-side suggestion calculation algorithm.

### 5.2.4 Violation Handling

N/A - this is a deterministic logic rule.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-034', 'dependency_reason': 'This story enhances the UI created in US-034. The resistance value input field and tolerance selector from US-034 are required for this feature to be implemented.'}

## 6.2.0 Technical Dependencies

- A client-side data structure (e.g., static JSON asset) containing the standard values for E-series E6, E12, E24, E48, E96, and E192.
- A mapping between tolerance percentages and their corresponding E-series.

## 6.3.0 Data Dependencies

- Accurate, validated lists of IEC 60063 standard resistor values for all relevant E-series.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The suggestion calculation and UI update must complete in under 50ms, as per REQ-NFP-001, to feel instantaneous to the user.

## 7.2.0 Security

- All logic is client-side; no server interaction is required. Input should still be sanitized as a general best practice, though the risk is minimal.

## 7.3.0 Usability

- The suggestion should be helpful and not intrusive. It should not block the user from proceeding with their non-standard value if they choose to ignore the suggestion.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Logic is self-contained on the client-side.
- Requires implementing a 'find nearest number in an array' algorithm.
- UI integration is straightforward, involving conditional rendering of a single element.
- The E-series data needs to be sourced and stored within the application's assets.

## 8.3.0 Technical Risks

- The E-series data must be accurate. An error in the source data will lead to incorrect suggestions.

## 8.4.0 Integration Points

- Integrates with the React state of the Resistor Color Code component, specifically reading the resistance value and tolerance, and providing a callback to update the resistance value.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Component Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify correct suggestions for values below, above, and between standard points for each E-series.
- Verify no suggestion is shown for exact standard values.
- Verify the tie-breaking rule (round down) is correctly implemented.
- Verify the UI updates correctly when a suggestion is clicked.
- Verify the suggestion updates when the tolerance value is changed.
- Verify keyboard navigation and activation of the suggestion element.

## 9.3.0 Test Data Needs

- A set of input values with known-correct nearest standard values for E24, E48, and E96 series.
- Test cases for values at different orders of magnitude (e.g., Ω, kΩ, MΩ).

## 9.4.0 Testing Tools

- Jest
- React Testing Library
- Cypress

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and component tests implemented with >90% coverage for the suggestion logic
- E2E tests for the user interaction flow are implemented and passing
- User interface reviewed for clarity, consistency, and adherence to the style guide
- Accessibility requirements (keyboard nav, screen reader support) validated
- Functionality verified on all target browsers (latest Chrome, Firefox, Safari, Edge)
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

2

## 11.2.0 Priority

🟡 Medium

## 11.3.0 Sprint Considerations

- This is a 'delighter' feature that significantly improves usability. It should be prioritized after the core functionality of the resistor converter (US-034) is complete and stable.

## 11.4.0 Release Impact

- This feature adds significant value to the electronics toolset and can be highlighted in release notes as a key usability improvement.

