# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-033 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Receive validation error for invalid resistor valu... |
| As A User Story | As an electronics hobbyist or student using the Re... |
| User Persona | Any user of the 'Resistor Combinations' mode, such... |
| Business Value | Ensures data integrity for calculations, prevents ... |
| Functional Area | Advanced Electronics Features |
| Story Theme | Resistor Combination Calculator |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

User adds a valid positive resistor value

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is on the 'Resistor Combinations' screen

### 3.1.5 When

The user enters a positive, non-zero number (e.g., '10k') into the resistor input field and attempts to add it to the list

### 3.1.6 Then

The resistor value is successfully added to the list of resistors for calculation.

### 3.1.7 Validation Notes

Verify that the new resistor appears in the UI list and the input field is cleared or ready for the next entry.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User attempts to add a resistor with a value of zero

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

The user is on the 'Resistor Combinations' screen

### 3.2.5 When

The user enters '0' into the resistor input field and attempts to add it

### 3.2.6 Then

The value is not added to the resistor list.

### 3.2.7 And

The input field is visually highlighted (e.g., with a red border) to indicate an error.

### 3.2.8 Validation Notes

Check the DOM for the error message and the CSS class on the input field. Ensure the resistor list count does not increase.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User attempts to add a resistor with a negative value

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The user is on the 'Resistor Combinations' screen

### 3.3.5 When

The user enters a negative number (e.g., '-100') into the resistor input field and attempts to add it

### 3.3.6 Then

The value is not added to the resistor list.

### 3.3.7 And

The input field is visually highlighted to indicate an error.

### 3.3.8 Validation Notes

Confirm the behavior is identical to the zero-value case. The resistor list should remain unchanged.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error state is cleared upon correction

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

The resistor input field is in an error state with a validation message displayed

### 3.4.5 When

The user corrects the input to a valid, positive number

### 3.4.6 Then

The error message is removed.

### 3.4.7 And

The visual error highlighting on the input field is removed.

### 3.4.8 Validation Notes

This can be tested by first entering '-10' to trigger the error, then changing the input to '10' and observing that the error state clears immediately.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User attempts to edit an existing resistor to an invalid value

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

The user has a valid resistor (e.g., '220') in the list and initiates an edit action on it

### 3.5.5 When

The user changes the value to '0' and attempts to save the change

### 3.5.6 Then

The change is rejected, and the resistor's value remains '220'.

### 3.5.7 And

An inline error message is displayed within the editing UI, indicating the value is invalid.

### 3.5.8 Validation Notes

Verify that the original value is preserved in the list and the error is shown within the context of the item being edited.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Backend API rejects invalid resistor values

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

A user is authenticated

### 3.6.5 When

The client sends an API request to add or update a resistor with a value less than or equal to zero

### 3.6.6 Then

The backend API rejects the request with a 4xx HTTP status code (e.g., 400 Bad Request).

### 3.6.7 And

The API response body contains a structured error message indicating the validation failure, compliant with RFC 7807.

### 3.6.8 Validation Notes

Use an API testing tool like Postman or Supertest to send a direct request with invalid data and assert the response status and body.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Input field for resistor value
- Text element for inline validation message
- Visual indicator on the input field (e.g., border color) for error state

## 4.2.0 User Interactions

- Validation should trigger on blur or on an attempt to add the value.
- The error message and visual indicator must be removed as soon as the user corrects the input to a valid state.
- The 'Add' button may be disabled if the input field contains an invalid value.

## 4.3.0 Display Requirements

- Error messages must be human-readable and clearly state the validation rule that was violated.

## 4.4.0 Accessibility Needs

- The error message must be programmatically associated with the input field using `aria-describedby` to be announced by screen readers.
- Color must not be the only means of conveying the error state, per WCAG 2.1 standards.

# 5.0.0 Business Rules

- {'rule_id': 'BR-RES-001', 'rule_description': 'All resistor values must be positive, non-zero numbers.', 'enforcement_point': 'Client-side (UI) for immediate feedback and Backend (API) for data integrity.', 'violation_handling': 'The invalid value is rejected. The client displays a user-friendly error message. The backend returns a 400-level HTTP error.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-032', 'dependency_reason': 'This story implements validation on the UI for adding/editing resistor values, which is created in US-032.'}

## 6.2.0 Technical Dependencies

- Frontend form management/state handling library.
- Backend API endpoint for creating/updating resistor list items.
- Backend validation framework (e.g., class-validator in NestJS).

## 6.3.0 Data Dependencies

*No items available*

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- Client-side validation must be instantaneous, with UI feedback appearing in under 50ms.

## 7.2.0 Security

- Backend validation is mandatory to prevent circumvention of client-side checks and ensure data integrity at the source of truth (REQ-API-001, REQ-BIZ-001).

## 7.3.0 Usability

- Error feedback must be immediate, contextual, and constructive, helping the user to correct their input easily.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards for form validation and error feedback (REQ-UI-001).

## 7.5.0 Compatibility

- Validation behavior must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Standard form validation on the client.
- Standard DTO validation on the backend.
- The business rule is simple and unambiguous.

## 8.3.0 Technical Risks

- Minor risk of inconsistency between client and backend validation logic if not managed carefully. The backend is the source of truth.

## 8.4.0 Integration Points

- Frontend Resistor Combination component.
- Backend API endpoint for managing the user's resistor list.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Enter a valid positive integer.
- Enter a valid positive float.
- Enter '0'.
- Enter a negative number.
- Enter non-numeric text.
- Trigger error, then correct the input.
- Edit an existing valid value to an invalid one.
- Send a direct API request with an invalid value.

## 9.3.0 Test Data Needs

- Set of valid inputs: [1, 100, 2.2, '47k']
- Set of invalid inputs: [0, -1, -100, 'abc', '']

## 9.4.0 Testing Tools

- Jest/React Testing Library for frontend unit tests.
- Jest/Supertest for backend API tests.
- Cypress for E2E tests.
- Axe for accessibility checks.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for both client and server validation logic, passing with >=85% coverage
- API integration testing completed successfully
- E2E tests covering invalid input scenarios are passing
- User interface reviewed and approved for clarity and usability of error feedback
- Accessibility requirements for error reporting are validated with a screen reader
- Documentation updated appropriately
- Story deployed and verified in staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

1

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story should be completed in the same sprint as or immediately following US-032 to ensure the feature is robust upon release.

## 11.4.0 Release Impact

This is a core data integrity requirement for the Resistor Combination feature. Releasing without it would allow for incorrect calculations and a poor user experience.

