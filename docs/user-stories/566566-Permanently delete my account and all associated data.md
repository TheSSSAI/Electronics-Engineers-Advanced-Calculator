# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-058 |
| Elaboration Date | 2025-01-20 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Permanently delete my account and all associated d... |
| As A User Story | As a registered user concerned with my data privac... |
| User Persona | A registered user who has decided to leave the ser... |
| Business Value | Ensures compliance with data protection regulation... |
| Functional Area | User Account Management |
| Story Theme | User Persistence and Data Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful account deletion via confirmation modal

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a registered user is logged in and has navigated to their account settings page

### 3.1.5 When

the user clicks the 'Delete Account' button

### 3.1.6 Then

a confirmation modal is displayed, clearly stating the action is permanent and irreversible, and will delete all calculation history, variables, and custom modes.

### 3.1.7 Validation Notes

Verify the modal appears and its text is accurate and unambiguous.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Confirmation input enables the final delete button

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the account deletion confirmation modal is displayed

### 3.2.5 When

the user types their exact username into the confirmation input field

### 3.2.6 Then

the 'Permanently Delete My Account' button becomes enabled.

### 3.2.7 Validation Notes

Test that the button's disabled state changes to enabled only when the input text is a perfect match.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Final confirmation triggers data deletion and logout

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user has correctly entered their username in the confirmation modal and the final delete button is enabled

### 3.3.5 When

the user clicks the 'Permanently Delete My Account' button

### 3.3.6 Then

a request is sent to the backend to delete the user's account and all associated data.

### 3.3.7 Validation Notes

Monitor network traffic to confirm the API call is made.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Backend successfully deletes all user data

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the backend has received a valid request to delete a user account

### 3.4.5 When

the deletion process is executed

### 3.4.6 Then

all records associated with the user's ID are permanently removed from the `users`, `custom_modes`, `user_variables`, and `calculation_history` tables, and the user is deleted from the AWS Cognito user pool.

### 3.4.7 Validation Notes

Requires database and Cognito verification to confirm all traces of the user are gone. This should be a transactional operation.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User is redirected and notified after successful deletion

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the backend has successfully deleted the user's account and data

### 3.5.5 When

the API returns a success response to the client

### 3.5.6 Then

the user's local session is terminated, they are redirected to the public login page, and a success message (e.g., 'Your account has been successfully deleted.') is displayed.

### 3.5.7 Validation Notes

Verify redirection, message display, and that local storage/session tokens are cleared.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Deleted user cannot log in again

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

a user has successfully deleted their account

### 3.6.5 When

the former user attempts to log in with their old credentials

### 3.6.6 Then

the login attempt fails with an 'Invalid credentials' error.

### 3.6.7 Validation Notes

This is the final confirmation that the user was removed from the identity provider.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User cancels the deletion process

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

the account deletion confirmation modal is displayed

### 3.7.5 When

the user clicks the 'Cancel' button or closes the modal

### 3.7.6 Then

the modal is dismissed, the user remains on the account settings page, and no data is deleted.

### 3.7.7 Validation Notes

Verify the user's session remains active and no API call for deletion was made.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

User enters incorrect confirmation text

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

the account deletion confirmation modal is displayed

### 3.8.5 When

the user types text that does not match their username into the confirmation field

### 3.8.6 Then

the 'Permanently Delete My Account' button remains disabled.

### 3.8.7 Validation Notes

Test with partial matches, case-sensitive mismatches, and completely incorrect text.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-009

### 3.9.2 Scenario

API call fails during deletion process

### 3.9.3 Scenario Type

Error_Condition

### 3.9.4 Given

the user has confirmed their intent to delete their account

### 3.9.5 When

the client-side application receives an error response (e.g., 5xx) from the backend API

### 3.9.6 Then

an error message is displayed to the user (e.g., 'An error occurred. Please try again.'), the user remains logged in, and no data is deleted.

### 3.9.7 Validation Notes

Use tools like browser devtools or a proxy to mock a server error and verify the UI handles it gracefully.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Delete Account' button in the user settings/profile area, styled as a destructive action (e.g., red text).
- A blocking confirmation modal dialog.
- A text input field within the modal for the user to type their username for confirmation.
- A 'Permanently Delete My Account' button (confirm action) within the modal.
- A 'Cancel' button (cancel action) within the modal.
- A non-persistent success/error notification component (e.g., toast).

## 4.2.0 User Interactions

- Clicking 'Delete Account' opens the modal.
- The 'Permanently Delete My Account' button is disabled by default.
- Typing the correct username into the input field enables the 'Permanently Delete My Account' button.
- Clicking 'Cancel' or the modal's close icon dismisses the modal with no action.
- Clicking the final delete button triggers the API call and shows a loading state.

## 4.3.0 Display Requirements

- The modal must explicitly state that the action is permanent and will erase all user data.
- The application must provide clear feedback on success or failure of the deletion attempt.

## 4.4.0 Accessibility Needs

- The confirmation modal must trap focus, preventing interaction with the background page.
- All buttons and input fields must have accessible labels for screen readers.
- The modal must be dismissible via the Escape key.
- Color should not be the only indicator for the destructive action button; text and icons should also be used.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-DEL-001

### 5.1.2 Rule Description

Account deletion is an atomic, transactional operation. If any part of the deletion fails (e.g., removing data from the application DB or deleting from the IdP), the entire operation must be rolled back to prevent data inconsistency.

### 5.1.3 Enforcement Point

Backend API Service

### 5.1.4 Violation Handling

The API should return a 500-level error, and the database transaction must be rolled back. No partial data deletion is permitted.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-DEL-002

### 5.2.2 Rule Description

A user can only delete their own account. The system must verify that the authenticated user's ID matches the ID of the account being requested for deletion.

### 5.2.3 Enforcement Point

Backend API Service (Authorization Middleware)

### 5.2.4 Violation Handling

The API should return a 403 Forbidden or 404 Not Found error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-052

#### 6.1.1.2 Dependency Reason

A user account must be created before it can be deleted.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

User must be logged in to access account settings and initiate deletion.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

REQ-DAT-001

#### 6.1.3.2 Dependency Reason

The database schema for all user-related data must be defined and implemented, as this story's purpose is to delete that data.

## 6.2.0.0 Technical Dependencies

- AWS Cognito: The backend needs SDK and IAM permissions to call the `AdminDeleteUser` API.
- PostgreSQL Database (Amazon RDS): The backend needs permissions to execute `DELETE` statements on user-related tables.
- Frontend Authentication State Management: The client needs a way to clear all session information upon successful deletion.

## 6.3.0.0 Data Dependencies

- Requires a test user account with associated data (history, variables, custom modes) to exist for end-to-end testing.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The entire backend deletion process (database + Cognito) should complete within 2 seconds to provide timely feedback to the user.

## 7.2.0.0 Security

- The API endpoint for account deletion must be protected and require a valid JWT.
- The system must prevent Cross-Site Request Forgery (CSRF) attacks on this endpoint.
- The confirmation step of re-typing the username helps prevent accidental deletion from a compromised but active session.

## 7.3.0.0 Usability

- The process should be straightforward but deliberate, with clear warnings to prevent accidental data loss.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires a transactional, multi-step backend process involving both the application database and an external service (Cognito).
- Error handling and rollback logic are critical to prevent inconsistent states (e.g., user deleted from DB but not Cognito).
- Frontend state management for the confirmation modal and post-deletion cleanup.

## 8.3.0.0 Technical Risks

- Failure to implement the backend deletion as a single transaction could lead to orphaned data.
- Insufficient IAM permissions for the backend service to call the Cognito API could block implementation.

## 8.4.0.0 Integration Points

- Backend User Service <-> Amazon RDS (PostgreSQL)
- Backend User Service <-> AWS Cognito API

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- A full end-to-end test of creating a user, adding data (history, variables), deleting the user, and verifying the user and all their data is gone from all systems.
- Test the cancellation flow.
- Test the API failure scenario to ensure the UI provides correct feedback and the user is not logged out.
- Test API security by attempting to delete an account using another user's auth token.

## 9.3.0.0 Test Data Needs

- Disposable user accounts in a test environment (e.g., a dedicated Cognito test pool).
- Sample user data (history, variables, modes) associated with test accounts.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Jest and Supertest for backend integration tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Frontend and backend code reviewed and merged into the main branch.
- Unit test coverage for the new logic meets the project standard (85%).
- Integration tests for the deletion API endpoint are implemented and passing.
- A full E2E test scenario for account deletion is implemented and passing.
- The deletion process is confirmed to be transactional and correctly handles failures.
- UI/UX has been reviewed and approved for clarity and safety.
- All related documentation (e.g., API spec) is updated.
- Feature is deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a critical feature for legal compliance and should be prioritized for the initial launch.
- Requires coordination between frontend and backend development.
- Requires configuration of IAM permissions in the AWS environment, which may need to be done ahead of development work.

## 11.4.0.0 Release Impact

This feature is mandatory for a public v1.0 release due to legal and data privacy requirements.

