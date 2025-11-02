# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-069 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Accept Terms of Service and Privacy Policy during ... |
| As A User Story | As a prospective user registering for a new accoun... |
| User Persona | A new, unregistered user attempting to create an a... |
| Business Value | Ensures legal and regulatory compliance (e.g., GDP... |
| Functional Area | User Management & Authentication |
| Story Theme | User Onboarding |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successful registration with terms acceptance

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A new user is on the registration page and has filled in all valid required fields (e.g., email, password)

### 3.1.5 When

The user checks the box to accept the Terms of Service and Privacy Policy

### 3.1.6 Then

The 'Create Account' button becomes enabled, and clicking it successfully submits the registration request.

### 3.1.7 Validation Notes

Verify via E2E test that the form submits. Verify in the backend that the user is created and the `terms_accepted_at` timestamp is recorded in the database.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Error Condition: Attempting to register without accepting terms

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

A new user is on the registration page and has filled in all valid required fields

### 3.2.5 When

The user attempts to click the 'Create Account' button without checking the acceptance box

### 3.2.6 Then

The 'Create Account' button remains disabled and the form submission is prevented.

### 3.2.7 Validation Notes

E2E test: Assert the 'disabled' attribute is present on the button. Backend API integration test: Send a request without the acceptance flag and assert a 400 Bad Request response.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Alternative Flow: Unchecking the acceptance box after checking it

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

A user has filled all fields and checked the acceptance box, enabling the 'Create Account' button

### 3.3.5 When

The user then unchecks the acceptance box

### 3.3.6 Then

The 'Create Account' button immediately becomes disabled.

### 3.3.7 Validation Notes

Verify via frontend unit test and E2E test that the button's state changes reactively.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

UI Interaction: Accessing the legal documents

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

A new user is on the registration page

### 3.4.5 When

The user clicks the 'Terms of Service' or 'Privacy Policy' link

### 3.4.6 Then

The corresponding document opens in a new browser tab, leaving the registration form state intact in the original tab.

### 3.4.7 Validation Notes

Manual and E2E tests to verify that links open correctly (`target="_blank"`) and do not disrupt the form.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Security: Backend validation and audit trail

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

The backend receives a valid registration request

### 3.5.5 When

The request payload includes an explicit flag indicating acceptance of terms

### 3.5.6 Then

The user record is created in the database with a non-null timestamp in the `terms_accepted_at` column.

### 3.5.7 Validation Notes

Integration test to verify the database record after a successful API call.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A single checkbox for acceptance.
- Descriptive text adjacent to the checkbox, e.g., 'I agree to the [Terms of Service] and [Privacy Policy]'.
- Hyperlinks for 'Terms of Service' and 'Privacy Policy' within the descriptive text.

## 4.2.0 User Interactions

- The 'Create Account' button's enabled/disabled state must be dynamically bound to the checkbox's checked state (in addition to other form validation).
- Clicking the legal document links must open them in a new tab or modal without losing form data.

## 4.3.0 Display Requirements

- A clear, non-ambiguous statement of agreement must be displayed.
- If submission is attempted without acceptance, a subtle visual cue (e.g., tooltip on the disabled button) should indicate why it's disabled.

## 4.4.0 Accessibility Needs

- The checkbox must be keyboard-focusable and operable (using the spacebar).
- The checkbox must have a proper `aria-label` or be associated with its text label via `for`/`id` attributes for screen readers.
- Links must have discernible text for screen readers.
- Adheres to WCAG 2.1 Level AA standards as per REQ-UI-001.

# 5.0.0 Business Rules

- {'rule_id': 'BR-002', 'rule_description': 'A user account cannot be created unless the user has explicitly accepted the current Terms of Service and Privacy Policy.', 'enforcement_point': 'Backend API (User Registration Endpoint). Client-side validation is for UX only.', 'violation_handling': 'The API will reject the request with an HTTP 400 Bad Request status and a clear error message.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-052

#### 6.1.1.2 Dependency Reason

This story adds a mandatory control to the user registration form, which must be implemented first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-070

#### 6.1.2.2 Dependency Reason

This story requires links to the legal documents. The pages/routes to display those documents must exist first.

## 6.2.0.0 Technical Dependencies

- The React registration component must be available for modification.
- The NestJS user registration API endpoint must be available for modification.
- A database migration tool (TypeORM as per REQ-DAT-001) must be in place to handle schema changes.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

- Final legal text for the 'Terms of Service' and 'Privacy Policy' documents must be provided by the legal/product team.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- UI response to checking/unchecking the box (e.g., button state change) must be under 50ms.

## 7.2.0.0 Security

- The act of acceptance must be recorded with a timestamp on the backend as an immutable audit record.
- The backend must be the authoritative source for enforcing this rule; client-side checks are for user experience only.

## 7.3.0.0 Usability

- It must be clear and unambiguous to the user that acceptance is a required step for registration.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Requires coordinated changes across frontend, backend, and database.
- A database schema migration is required, which must be handled carefully in the CI/CD pipeline.

## 8.3.0.0 Technical Risks

- Risk of deployment failure if the database migration script is not executed before the new application code is deployed.

## 8.4.0.0 Integration Points

- Frontend: React Registration Form
- Backend: NestJS User Service (Registration Controller/Service)
- Database: PostgreSQL `users` table

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- User successfully registers after checking the box.
- User is blocked from registering if the box is not checked.
- Button state correctly toggles when the box is checked and unchecked.
- API rejects requests that are missing the `termsAccepted` flag.
- Database correctly stores the acceptance timestamp upon successful registration.
- Legal document links open in a new tab.
- Keyboard navigation and screen reader functionality for the checkbox and links.

## 9.3.0.0 Test Data Needs

- Valid new user credentials (email/password) for testing registration.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Cypress (E2E)
- Axe-core (Accessibility)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented for new logic, maintaining >=85% coverage
- E2E tests for the registration flow updated and passing
- Database migration script created, tested, and merged
- User interface reviewed for UX and accessibility compliance (WCAG 2.1 AA)
- Security requirement of backend audit trail is validated
- All related documentation (e.g., API spec) is updated
- Story deployed and verified in the `staging` environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

2

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a legal and launch-blocking requirement. It must be completed before the application is made publicly available.
- Dependent on US-052 and US-070, so it cannot be started until they are complete.

## 11.4.0.0 Release Impact

Critical for the initial v1.0 launch. The release cannot proceed without this functionality.

