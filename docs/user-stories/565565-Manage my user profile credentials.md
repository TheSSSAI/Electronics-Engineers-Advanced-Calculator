# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-057 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Manage my user profile credentials |
| As A User Story | As a registered user, I want to access a secure pr... |
| User Persona | A registered user who is currently logged into the... |
| Business Value | Enhances user account security, provides user self... |
| Functional Area | User Account Management |
| Story Theme | User Authentication and Persistence |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Accessing the profile management interface

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a registered user and I am logged into the application

### 3.1.5 When

I navigate to my user account menu

### 3.1.6 Then

I see a clearly labeled option such as 'Manage Profile' or 'Account Settings'.

### 3.1.7 Validation Notes

Verify the presence and visibility of the profile management link/button for an authenticated user session.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Redirecting to the external identity provider for profile management

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am logged into the application

### 3.2.5 When

I click the 'Manage Profile' option

### 3.2.6 Then

I am securely redirected to the user profile management interface hosted by the external Identity Provider (AWS Cognito).

### 3.2.7 Validation Notes

Use browser developer tools to confirm the redirection target URL is the correct AWS Cognito Hosted UI endpoint. The redirection must use HTTPS.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Verifying successful password change

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have successfully changed my password using the identity provider's interface

### 3.3.5 When

I log out of the application and attempt to log in with my new password

### 3.3.6 Then

My login is successful and I am granted access to the application.

### 3.3.7 Validation Notes

This is an end-to-end test. It requires manually changing the password in the Cognito UI and then verifying authentication with the new credentials against the application's login flow (US-053).

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Verifying successful email update

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I have successfully updated and verified my new email address using the identity provider's interface

### 3.4.5 When

I log out, log back into the application, and view my profile information within the app

### 3.4.6 Then

The application correctly displays my new, updated email address.

### 3.4.7 Validation Notes

This test verifies that the application's frontend correctly fetches and displays the updated user attributes from the JWT or user info endpoint after a change is made in Cognito.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to access profile management when unauthenticated

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am not logged into the application

### 3.5.5 When

I attempt to navigate directly to the profile management entry point (e.g., via a bookmarked URL)

### 3.5.6 Then

I am redirected to the login page and the profile management interface is not displayed.

### 3.5.7 Validation Notes

Verify that any route guards or server-side checks prevent access and correctly redirect the user to the login flow.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A 'Manage Profile' or 'Account Settings' link/button within a user dropdown menu or a dedicated settings page.

## 4.2.0 User Interactions

- User clicks the link/button, which triggers a full-page redirect to an external URL.

## 4.3.0 Display Requirements

- The application does not need to display the password/email change forms themselves, as this is handled by the external IdP.
- After an email change, any part of the UI displaying the user's email should reflect the new value upon the next session refresh.

## 4.4.0 Accessibility Needs

- The 'Manage Profile' link/button must be keyboard-focusable and have a descriptive label for screen readers, compliant with WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

User profile management actions (password change, email update) must be handled by the configured external Identity Provider (AWS Cognito).

### 5.1.3 Enforcement Point

Frontend application logic.

### 5.1.4 Violation Handling

The application should not implement its own forms for these actions. It must redirect to the IdP.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Access to the profile management entry point is restricted to authenticated users only.

### 5.2.3 Enforcement Point

Frontend routing and/or backend API middleware.

### 5.2.4 Violation Handling

Unauthenticated users are redirected to the login page.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-052

#### 6.1.1.2 Dependency Reason

A user must be able to register for an account before they can manage it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

A user must be able to log in to access authenticated features like profile management.

## 6.2.0.0 Technical Dependencies

- AWS Cognito User Pool must be fully configured.
- AWS Cognito Hosted UI must be enabled, styled, and configured with the correct application callback URLs.
- Frontend application must be configured with the AWS Cognito client ID and domain to construct the correct redirection URL.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

- This feature is entirely dependent on the availability and correct functioning of the AWS Cognito service.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The redirection to the external IdP should be initiated in under 200ms after the user clicks the link.

## 7.2.0.0 Security

- All communication with the external IdP must be over HTTPS (TLS 1.2+).
- The application must not handle or store the user's password at any point during the change process.
- The application must validate the JWT from Cognito to ensure the user is authenticated before showing the profile management link.

## 7.3.0.0 Usability

- The entry point for profile management should be located in an intuitive and conventional location, such as a user avatar dropdown menu in the main navigation.

## 7.4.0.0 Accessibility

- The UI element for accessing profile management must meet WCAG 2.1 Level AA standards.

## 7.5.0.0 Compatibility

- The redirection mechanism must function correctly on all supported browsers as defined in REQ-ENV-001 (Chrome, Firefox, Safari, Edge).

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- The primary work is configuration of AWS Cognito, not application-level coding.
- Frontend development is limited to adding a single navigation link that points to a constructed URL.
- Requires knowledge of AWS Cognito configuration, specifically the Hosted UI.

## 8.3.0.0 Technical Risks

- Misconfiguration of Cognito callback URLs could break the login flow after a user changes their details.
- Branding and styling the Cognito Hosted UI to match the application may have limitations.

## 8.4.0.0 Integration Points

- Frontend Application -> AWS Cognito Hosted UI

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify that a logged-in user can see the link and be redirected correctly.
- Verify that a logged-out user cannot see the link and is redirected to login if they try to access the URL directly.
- Perform an E2E test: log in, navigate to Cognito, change password, log out, log back in with new password.
- Perform an E2E test: log in, navigate to Cognito, change email, log out, log back in, verify new email is displayed in the app.

## 9.3.0.0 Test Data Needs

- At least one pre-provisioned test user account in the AWS Cognito User Pool.

## 9.4.0.0 Testing Tools

- Cypress or Playwright for E2E testing of the application flow up to the redirection point and for post-change verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code for the UI link is reviewed and approved
- AWS Cognito Hosted UI is configured and enabled in all relevant environments (dev, staging, prod)
- E2E tests verifying the redirection and post-change effects are implemented and passing
- UI element for profile management is reviewed for accessibility and usability
- Security review confirms that no credentials are handled by the application
- Documentation for configuring the Cognito URL in the application is created or updated
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story requires a developer with permissions and expertise in AWS Cognito configuration.
- The effort is split between infrastructure-as-code (Terraform for Cognito) and frontend development (UI link).
- Coordination may be needed to ensure Cognito settings are consistent across environments.

## 11.4.0.0 Release Impact

This is a core feature for user self-service and is expected for a v1.0 launch.

