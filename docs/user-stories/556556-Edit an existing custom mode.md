# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-048 |
| Elaboration Date | 2025-01-24 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Edit an existing custom mode |
| As A User Story | As a registered user who creates custom calculatio... |
| User Persona | A registered user who has created one or more cust... |
| Business Value | Increases user engagement and the utility of the c... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Initiating the edit process from the management screen

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user viewing the 'Custom Mode Management' screen, which lists my created modes

### 3.1.5 When

I click the 'Edit' button or icon associated with a specific custom mode

### 3.1.6 Then

The application navigates me to the custom mode wizard interface

### 3.1.7 And

All fields in the wizard (Name, Description, Input Variables, Output Variables, Formulas) are pre-populated with the existing data for the selected mode.

### 3.1.8 Validation Notes

Verify that the correct mode's data is fetched via API and correctly populates the wizard's state. The URL should likely reflect the editing context, e.g., `/modes/edit/{modeId}`.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully editing and saving changes to a custom mode

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I have opened one of my custom modes in the edit wizard

### 3.2.5 When

I modify the mode's description, add a new input variable, and update a formula to use the new variable

### 3.2.6 And

The list of modes reflects any visible changes (e.g., the updated description).

### 3.2.7 Then

The system validates the changes and sends an update request to the backend API

### 3.2.8 Validation Notes

Use browser developer tools to monitor the PUT/PATCH request to the API. After saving, launch the edited mode to confirm all changes (new variable, updated formula logic) are active.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Canceling the edit process and discarding changes

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I have opened a custom mode for editing and have made several unsaved changes

### 3.3.5 When

I confirm that I want to discard the changes

### 3.3.6 Then

I am redirected back to the 'Custom Mode Management' screen

### 3.3.7 And

The original custom mode remains unchanged.

### 3.3.8 Validation Notes

After canceling, re-open the same mode for editing and verify that none of the previously entered changes were saved.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to save an edit with an invalid formula

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am editing a custom mode

### 3.4.5 When

I modify a formula to contain a syntax error (e.g., 'output = 5 +* input1')

### 3.4.6 And

I remain on the edit screen, allowing me to correct the error.

### 3.4.7 Then

The save operation is prevented

### 3.4.8 Validation Notes

Verify that the backend API rejects the request with a 4xx status code and a structured error message, and that the frontend correctly parses this response to display the error to the user.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to save after deleting a variable that is still used in a formula

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am editing a custom mode that has an input 'resistance' and a formula 'voltage = resistance * current'

### 3.5.5 When

I delete the 'resistance' input variable but do not update the formula

### 3.5.6 And

I remain on the edit screen to resolve the conflict.

### 3.5.7 Then

The save operation is prevented

### 3.5.8 Validation Notes

This validation must be enforced on the backend as the ultimate source of truth, as specified in REQ-API-001.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User attempts to edit a mode that does not belong to them

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a logged-in user

### 3.6.5 When

I attempt to access the edit URL for a mode ID that belongs to another user (e.g., by manipulating the URL)

### 3.6.6 Then

The backend API returns a 'Forbidden' (403) or 'Not Found' (404) error

### 3.6.7 And

The frontend displays an appropriate error page or message.

### 3.6.8 Validation Notes

This is a critical security test. It should be performed at the API integration testing level.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Edit' button/icon next to each mode on the Custom Mode Management screen.
- The existing Custom Mode Wizard component, populated with data.
- A 'Save Changes' or 'Update' button in the wizard.
- A 'Cancel' button in the wizard.
- A confirmation modal for the 'Cancel' action.

## 4.2.0 User Interactions

- Clicking 'Edit' loads the wizard with the selected mode's data.
- The wizard form should be fully interactive, allowing modification of all fields.
- Clicking 'Save Changes' triggers validation and an API call.
- Clicking 'Cancel' triggers a confirmation prompt before navigating away.

## 4.3.0 Display Requirements

- The wizard's title or header should indicate that the user is in 'Edit Mode'.
- Validation errors must be clearly displayed next to the relevant fields.

## 4.4.0 Accessibility Needs

- All controls ('Edit', 'Save Changes', 'Cancel', form fields) must be fully keyboard accessible and have appropriate ARIA labels, adhering to WCAG 2.1 AA standards (REQ-UI-001).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user can only edit custom modes that they have created.

### 5.1.3 Enforcement Point

Backend API (Controller/Service layer) before retrieving or updating data.

### 5.1.4 Violation Handling

The API must return a 403 Forbidden or 404 Not Found status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

All formulas within a custom mode must be syntactically valid and only reference defined input/output variables or allowed functions/constants (REQ-FRX-001).

### 5.2.3 Enforcement Point

Backend API upon receiving a PUT/PATCH request to update a mode.

### 5.2.4 Violation Handling

The API must return a 400 Bad Request status code with a detailed error message indicating the validation failure.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

The custom mode creation wizard UI and logic must exist to be reused for editing.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-046

#### 6.1.2.2 Dependency Reason

The management screen for listing custom modes is the required entry point for initiating an edit.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-056

#### 6.1.3.2 Dependency Reason

The backend persistence mechanism for storing and retrieving custom modes must be implemented.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint: `GET /api/v1/custom-modes/{modeId}`
- Backend API endpoint: `PUT /api/v1/custom-modes/{modeId}`
- Frontend routing mechanism to handle dynamic routes like `/modes/edit/{modeId}`.
- Frontend state management solution (e.g., Redux Toolkit) to manage the wizard's form state.

## 6.3.0.0 Data Dependencies

- Requires existing custom mode data in the database for the logged-in user to test the feature.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to fetch the mode data for editing should respond in < 200ms (P95) as per REQ-NFP-001.
- The API call to save the updated mode should respond in < 200ms (P95).

## 7.2.0.0 Security

- The backend must enforce ownership, ensuring a user can only edit their own modes (RBAC).
- All input from the user (name, description, etc.) must be properly sanitized to prevent XSS attacks when rendered.

## 7.3.0.0 Usability

- The transition from the management list to the pre-populated wizard should feel seamless.
- Error messages for validation failures must be clear and actionable.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Adapting the 'create' wizard component to also handle an 'edit' mode, including fetching initial data and changing submission logic.
- Managing the state of a complex, dynamic form in the frontend.
- Implementing robust, multi-faceted validation logic on the backend (e.g., checking for orphaned variables in formulas).

## 8.3.0.0 Technical Risks

- Potential for complex state management bugs if the form's initial population and subsequent updates are not handled carefully.
- Incomplete validation on the backend could lead to corrupted custom mode definitions being saved.

## 8.4.0.0 Integration Points

- Frontend Custom Mode Management Component
- Frontend Custom Mode Wizard Component
- Backend Custom Mode Service (for GET and PUT operations)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify a user can successfully edit every field of a custom mode and save it.
- Verify the cancel workflow with its confirmation prompt.
- Test all validation failure scenarios (invalid syntax, orphaned variables).
- Perform a security test by attempting to edit another user's mode via URL manipulation.

## 9.3.0.0 Test Data Needs

- A test user account with at least two distinct custom modes.
- A second test user account to verify security boundaries.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend API integration tests.
- Cypress for end-to-end testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit test coverage for new logic meets the project standard (85% for backend)
- API integration tests for GET and PUT endpoints are implemented and passing
- E2E tests for the edit and cancel flows are implemented and passing
- Backend security rule (user can only edit their own modes) is explicitly tested and verified
- UI is consistent with the 'Create Mode' wizard and meets accessibility standards
- All changes are deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by the implementation of creating and listing custom modes (US-041, US-046). It should be prioritized immediately after them to complete the core CRUD functionality for this feature.

## 11.4.0.0 Release Impact

- Completes a critical piece of the custom mode management feature set, making the tool significantly more usable and robust.

