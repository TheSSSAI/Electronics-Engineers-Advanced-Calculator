# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-038 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Receive validation error for invalid 555 Astable d... |
| As A User Story | As an electronics designer using the 555 Timer Ast... |
| User Persona | Electronics hobbyist, student, or engineer using t... |
| Business Value | Improves the usability and reliability of the 555 ... |
| Functional Area | Advanced Electronics Features |
| Story Theme | 555 Timer Design Tool |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Valid Duty Cycle Input

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is viewing the '555 Timer Astable Mode' calculator.

### 3.1.5 When

The user enters a numerical value greater than 50 and less than 100 (e.g., '75') into the 'Duty Cycle' input field.

### 3.1.6 Then

The input is accepted and no validation error message is displayed for the 'Duty Cycle' field.

### 3.1.7 Validation Notes

Verify that the UI remains in a valid state and subsequent calculations can proceed.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Duty Cycle Input Below Lower Bound

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

The user is viewing the '555 Timer Astable Mode' calculator.

### 3.2.5 When

The user enters a numerical value less than 50 (e.g., '49.9') into the 'Duty Cycle' input field.

### 3.2.6 Then

An inline validation error message reading 'Duty cycle must be between 50% and 100%' is displayed adjacent to the input field.

### 3.2.7 Validation Notes

The input field should be visually marked as invalid (e.g., red border). The calculation should be blocked.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Duty Cycle Input Equal to Lower Bound

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The user is viewing the '555 Timer Astable Mode' calculator.

### 3.3.5 When

The user enters the numerical value '50' into the 'Duty Cycle' input field.

### 3.3.6 Then

An inline validation error message reading 'Duty cycle must be between 50% and 100%' is displayed adjacent to the input field.

### 3.3.7 Validation Notes

The boundary value of 50 is exclusive and therefore invalid.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Duty Cycle Input Above Upper Bound

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The user is viewing the '555 Timer Astable Mode' calculator.

### 3.4.5 When

The user enters a numerical value greater than 100 (e.g., '101') into the 'Duty Cycle' input field.

### 3.4.6 Then

An inline validation error message reading 'Duty cycle must be between 50% and 100%' is displayed adjacent to the input field.

### 3.4.7 Validation Notes

The input field should be visually marked as invalid.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Duty Cycle Input Equal to Upper Bound

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The user is viewing the '555 Timer Astable Mode' calculator.

### 3.5.5 When

The user enters the numerical value '100' into the 'Duty Cycle' input field.

### 3.5.6 Then

An inline validation error message reading 'Duty cycle must be between 50% and 100%' is displayed adjacent to the input field.

### 3.5.7 Validation Notes

The boundary value of 100 is exclusive and therefore invalid.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Correcting an Invalid Duty Cycle Input

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

The user has entered an invalid value (e.g., '40') into the 'Duty Cycle' field and an error message is visible.

### 3.6.5 When

The user modifies the input to a valid value (e.g., '65').

### 3.6.6 Then

The validation error message disappears and the input field's invalid visual state is removed.

### 3.6.7 Validation Notes

Verify that the validation state updates in real-time as the user types or upon losing focus (onBlur).

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Backend API Rejects Invalid Duty Cycle

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

A client attempts to send an API request to the 555 Astable calculation endpoint.

### 3.7.5 When

The request payload contains a 'dutyCycle' value of '50' or any other value outside the valid range.

### 3.7.6 Then

The backend API must reject the request with a 400 Bad Request HTTP status code and a machine-readable error response compliant with RFC 7807.

### 3.7.7 Validation Notes

Test via an API client like Postman or an integration test to ensure server-side enforcement as per REQ-BIZ-001.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Duty Cycle input field (numeric)
- Inline text element for displaying the validation error message

## 4.2.0 User Interactions

- Validation should trigger on user input (onChange) or when the field loses focus (onBlur) to provide immediate feedback.
- The error message should appear when validation fails and disappear when the input becomes valid.

## 4.3.0 Display Requirements

- The error message must clearly state the valid range: 'Duty cycle must be between 50% and 100%'.
- The input field should have a distinct visual style (e.g., red border) when its content is invalid, consistent with the application's design system.

## 4.4.0 Accessibility Needs

- The error message element must be programmatically linked to the input field using the `aria-describedby` attribute.
- The error message text color must have a contrast ratio of at least 4.5:1 against its background to meet WCAG 2.1 AA standards (REQ-UI-001).

# 5.0.0 Business Rules

- {'rule_id': 'BR-555-DC-01', 'rule_description': 'The desired duty cycle for a 555 timer in astable mode must be greater than 50% and less than 100%.', 'enforcement_point': 'Client-side (for immediate UX) and Backend API (for data integrity).', 'violation_handling': 'On the client, display an inline error message and prevent calculation. On the backend, reject the API request with a 400 status code.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-037', 'dependency_reason': "This story adds validation to the 'Duty Cycle' input field, which is created as part of the core 555 Astable mode feature in US-037."}

## 6.2.0 Technical Dependencies

- Application's shared form validation library/logic.
- Application's UI component library (Material-UI) for input fields and error message styling.

## 6.3.0 Data Dependencies

*No items available*

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- Client-side validation logic must execute in under 50ms to ensure a responsive user interface, as per REQ-NFP-001.

## 7.2.0 Security

- While client-side validation provides good UX, the business rule must be enforced on the backend API to prevent circumvention and ensure data integrity, as per REQ-API-001 and REQ-BIZ-001.

## 7.3.0 Usability

- The error message must be clear, concise, and provide actionable feedback to the user.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards, specifically regarding keyboard navigation, color contrast, and screen reader support for error messages (REQ-UI-001).

## 7.5.0 Compatibility

- Validation behavior must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Involves standard form validation logic.
- Frontend change is localized to a single component.
- Backend change is localized to a single DTO/validator for one endpoint.

## 8.3.0 Technical Risks

- Minimal risk. Potential for inconsistency between client and server validation logic if not carefully managed, but the rule is simple.

## 8.4.0 Integration Points

- Frontend: 555 Timer Astable Mode component.
- Backend: API endpoint responsible for 555 Astable calculations.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify happy path with a valid duty cycle (e.g., 75).
- Verify error conditions for values < 50, = 50, > 100, and = 100.
- Verify that correcting an invalid value removes the error message.
- Verify via API test that the backend rejects requests with invalid duty cycle values.
- Verify with a screen reader that the error message is announced correctly.

## 9.3.0 Test Data Needs

- A set of numerical inputs for the duty cycle field: {49.9, 50, 50.1, 75, 99.9, 100, 100.1}

## 9.4.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Integration)
- Cypress (E2E)
- Axe DevTools & screen reader (Accessibility)

# 10.0.0 Definition Of Done

- All acceptance criteria are validated and passing.
- Frontend and backend code has been peer-reviewed and approved.
- Unit tests covering the validation logic on both client and server achieve required code coverage and are passing.
- API integration test for the validation rule is implemented and passing.
- E2E test scenario for the user interaction is implemented and passing in the CI pipeline.
- Accessibility requirements (aria-describedby, color contrast) are implemented and manually verified.
- No regressions are introduced to the 555 Timer Astable mode feature.
- Story is deployed and verified in the staging environment.

# 11.0.0 Planning Information

## 11.1.0 Story Points

1

## 11.2.0 Priority

🟡 Medium

## 11.3.0 Sprint Considerations

- This is a small, self-contained story ideal for a single developer.
- Can be easily combined with other small stories to fill a sprint.
- Requires both frontend and backend changes, which should be coordinated.

## 11.4.0 Release Impact

Improves the quality and robustness of an existing feature. Low risk.

