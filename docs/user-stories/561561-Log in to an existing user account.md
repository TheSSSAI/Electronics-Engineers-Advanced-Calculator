# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-053 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Log in to an existing user account |
| As A User Story | As a returning user with an existing account, I wa... |
| User Persona | A returning user who has previously registered for... |
| Business Value | Enables user-specific data persistence and persona... |
| Functional Area | User Management & Authentication |
| Story Theme | User Account System |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful login with valid credentials

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered user is on the login page

### 3.1.5 When

The user enters their correct email and password and clicks the 'Log In' button

### 3.1.6 Then

The system authenticates the user successfully, a secure session is established, and the user is redirected to the main calculator view. The UI updates to reflect the logged-in state (e.g., showing a profile icon or user email), and the user's persisted data (history, variables, modes) is fetched and loaded into the application state.

### 3.1.7 Validation Notes

Verify redirection to the main app page. Check for the presence of a JWT in the application's state/memory. Use browser developer tools to confirm API calls are made to fetch user data and that the data is populated in the UI/Redux store.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Login attempt with incorrect password

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A registered user is on the login page

### 3.2.5 When

The user enters their correct email but an incorrect password and clicks 'Log In'

### 3.2.6 Then

A clear, non-specific error message such as 'Invalid email or password' is displayed. The user remains on the login page and is not authenticated.

### 3.2.7 Validation Notes

Verify that the specific error message appears and that no session token is created. The password field should be cleared for security, but the email field may be preserved for user convenience.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Login attempt with a non-existent email

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

A user is on the login page

### 3.3.5 When

The user enters an email address that is not registered in the system and clicks 'Log In'

### 3.3.6 Then

The same non-specific error message 'Invalid email or password' is displayed to prevent user enumeration. The user remains on the login page and is not authenticated.

### 3.3.7 Validation Notes

Confirm the error message is identical to the incorrect password scenario. This is a key security requirement.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Login attempt with empty fields

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

A user is on the login page

### 3.4.5 When

The user clicks the 'Log In' button without entering an email or password

### 3.4.6 Then

Client-side validation messages appear next to the required fields (e.g., 'Email is required'). No API call is made to the backend.

### 3.4.7 Validation Notes

Check for the appearance of validation messages and use browser developer tools to confirm no network request is sent to the authentication endpoint.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to access login page while already logged in

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

A user is already authenticated and has a valid session

### 3.5.5 When

The user navigates directly to the login page URL

### 3.5.6 Then

The user is automatically redirected to the main calculator view without being prompted to log in again.

### 3.5.7 Validation Notes

This can be tested by logging in, then manually typing the '/login' URL into the address bar and verifying the redirect.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Input field for 'Email'
- Input field for 'Password' (masked)
- A primary 'Log In' button
- A link to the 'Register' page
- A link for 'Forgot Password?' functionality

## 4.2.0 User Interactions

- The 'Log In' button should be disabled if either the email or password field is empty.
- Pressing 'Enter' in the password field should trigger the login action.
- Error messages should appear in close proximity to the relevant input field or form.

## 4.3.0 Display Requirements

- The login form should be clearly titled 'Log In'.
- After successful login, the main application UI must clearly indicate the user's authenticated status.

## 4.4.0 Accessibility Needs

- All form fields must have associated `<label>` tags.
- The page must be fully navigable using a keyboard (Tab, Shift+Tab, Enter).
- Error messages must be programmatically associated with their inputs using `aria-describedby` for screen reader users.
- Color contrast for text, inputs, and buttons must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-AUTH-001

### 5.1.2 Rule Description

Authentication credentials must be validated against the configured Identity Provider (AWS Cognito).

### 5.1.3 Enforcement Point

Backend API during the login request.

### 5.1.4 Violation Handling

Return a 401 Unauthorized status code with a standardized error response.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-AUTH-002

### 5.2.2 Rule Description

The API Gateway must enforce rate limiting on the login endpoint to mitigate brute-force attacks.

### 5.2.3 Enforcement Point

API Gateway configuration.

### 5.2.4 Violation Handling

Return a 429 Too Many Requests status code after the configured threshold is exceeded.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-052

#### 6.1.1.2 Dependency Reason

A user registration flow must exist to create accounts before they can be used for login.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-054

#### 6.1.2.2 Dependency Reason

The backend endpoint to fetch a user's calculation history must be available to be called upon successful login.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-055

#### 6.1.3.2 Dependency Reason

The backend endpoint to fetch a user's variables must be available.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-056

#### 6.1.4.2 Dependency Reason

The backend endpoint to fetch a user's custom modes must be available.

## 6.2.0.0 Technical Dependencies

- AWS Cognito User Pool and App Client must be configured (REQ-FRU-001).
- Frontend state management (Redux Toolkit) must be set up to handle authentication state (REQ-ARC-001).
- Backend authentication service/controller capable of interfacing with Cognito.
- Client-side routing library for handling redirects.

## 6.3.0.0 Data Dependencies

- Requires at least one pre-registered test user in the development environment database/user pool.

## 6.4.0.0 External Dependencies

- AWS Cognito service availability.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The end-to-end login process (from button click to main app view render) should have a P95 of under 1.5 seconds on a standard 4G connection.

## 7.2.0.0 Security

- All login traffic must be encrypted using HTTPS/TLS 1.2+ (REQ-API-001).
- The system must use the OAuth 2.0 Authorization Code flow with PKCE (REQ-API-001).
- JWTs must be stored securely on the client (e.g., in-memory) and not in localStorage to prevent XSS attacks.
- The backend must validate the JWT signature on every authenticated API request.
- Error messages for failed login attempts must be generic to prevent user enumeration.

## 7.3.0.0 Usability

- The login process should be simple and intuitive, following standard web conventions.

## 7.4.0.0 Accessibility

- The login form must be compliant with WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- The login functionality must work correctly on all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Integration with the external AWS Cognito service using the specified OAuth 2.0 flow (PKCE).
- Secure management of JWTs (access, refresh, ID tokens) on the client, including refresh logic.
- Coordinating application state changes between the UI, state management library, and secure token storage.
- Orchestrating the post-login data fetch for history, variables, and modes.

## 8.3.0.0 Technical Risks

- Incorrect configuration of the Cognito User Pool or App Client could block all authentication.
- Improper handling of token refresh logic could lead to users being logged out prematurely.

## 8.4.0.0 Integration Points

- Frontend client -> AWS Cognito (for authentication flow).
- Frontend client -> Backend API (for post-login data fetching).
- Backend API -> AWS Cognito (for token validation).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify successful login and data load.
- Verify login failure with incorrect password.
- Verify login failure with non-existent user.
- Verify client-side validation for empty fields.
- Verify redirect behavior for an already logged-in user.
- Verify keyboard-only navigation and form submission.
- Verify screen reader announcements for fields and errors.

## 9.3.0.0 Test Data Needs

- A set of valid credentials for a test user.
- A list of invalid credentials (correct email/wrong password, wrong email).

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Supertest for backend API integration tests.
- Cypress for end-to-end testing.
- Axe for automated accessibility checks.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >85% coverage for new logic
- E2E test for the happy path login flow is implemented and passing
- User interface is responsive and meets WCAG 2.1 AA accessibility standards
- Security review completed for token handling and API interactions
- All related documentation (e.g., API spec) has been updated
- Story deployed and successfully verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational story for the user-centric features of the application. It should be completed early in the project timeline.
- Requires coordination between frontend and backend developers to define the exact authentication flow and data-fetching contracts.

## 11.4.0.0 Release Impact

Blocks the release of any feature that requires a user to be logged in, such as saving variables or creating custom modes.

