# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-071 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Request my personal data |
| As A User Story | As a registered user concerned about my data priva... |
| User Persona | A registered user who is logged into the applicati... |
| Business Value | Ensures legal compliance with data protection regu... |
| Functional Area | User Account Management & Data Privacy |
| Story Theme | Legal and Compliance |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully initiating a data export request

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a registered user logged into my account

### 3.1.5 When

I navigate to my account settings page, click the 'Export My Data' button, and confirm my action in the subsequent modal dialog

### 3.1.6 Then

I see a success message stating 'Your data export request has been received. You will receive an email with a download link when it is ready.'

### 3.1.7 Validation Notes

Verify the UI shows the success message and an asynchronous job is queued in the backend (e.g., a message is sent to an SQS queue).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Receiving the data export email with a secure download link

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I have successfully requested a data export and the background job has completed

### 3.2.5 When

I check the inbox for the email address associated with my account

### 3.2.6 Then

I have received an email with the subject 'Your Personal Data Export from [Application Name]' containing a secure, time-limited (e.g., 24 hours) download link.

### 3.2.7 Validation Notes

Verify that an email is sent via the email service (e.g., AWS SES) and that the link is a valid, pre-signed URL to a secure location.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Successfully downloading the personal data file

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have received the data export email and the download link is still valid

### 3.3.5 When

I click the download link

### 3.3.6 Then

My browser initiates a download of a JSON file named in the format '[username]_data_export_[timestamp].json'.

### 3.3.7 Validation Notes

Click the link and confirm the file downloads with the correct name and format.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Verifying the content of the exported data file

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

I have downloaded my personal data export file

### 3.4.5 When

I open and inspect the contents of the JSON file

### 3.4.6 Then

The file must be well-formed JSON and contain a root object with my user details (`id`, `email`, `created_at`), and arrays for `calculation_history`, `user_variables`, and `custom_modes` with their complete definitions, but must not contain sensitive data like password hashes.

### 3.4.7 Validation Notes

Manually inspect or write a schema validation test for the generated JSON file to ensure all required data is present and sensitive data is excluded.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to request a new export while one is already in progress

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I have an active data export request that is still being processed

### 3.5.5 When

I navigate back to the account settings page

### 3.5.6 Then

The 'Export My Data' button is disabled and replaced with a status message like 'Your data export is currently being processed.'

### 3.5.7 Validation Notes

The backend should maintain a status for the export request. The frontend should query this status to render the UI appropriately.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempting to use an expired download link

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I have a download link from a data export email, but its validity period has passed

### 3.6.5 When

I click the expired link

### 3.6.6 Then

I am directed to a web page displaying a clear error message: 'This download link has expired. Please request a new data export from your account settings.'

### 3.6.7 Validation Notes

Test this by generating a link with a very short expiry (e.g., 1 minute) and attempting to access it after the time has passed.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

The background data export job fails

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I have requested a data export, but the background job encounters a critical error

### 3.7.5 When

The system detects the failure

### 3.7.6 Then

An email is sent to my registered address notifying me that the request failed and advising me to try again or contact support.

### 3.7.7 Validation Notes

Simulate a failure in the background worker (e.g., by throwing an exception) and verify that the error handling logic triggers the failure notification email and logs the error in CloudWatch.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled 'Export My Data' button within the user's account settings/profile page.
- A confirmation modal dialog with 'Confirm' and 'Cancel' buttons.
- A non-disruptive success notification/toast message.
- A status indicator/disabled button state for when an export is in progress.
- A dedicated, simple HTML page to display the 'Link Expired' message.

## 4.2.0 User Interactions

- User clicks button to open confirmation modal.
- User confirms to initiate the asynchronous process.
- User receives feedback that the request was successful.

## 4.3.0 Display Requirements

- The system must clearly communicate the status of the request (initiated, in progress, completed via email).
- The email must clearly state its purpose and the validity period of the download link.

## 4.4.0 Accessibility Needs

- All UI elements (button, modal, notifications) must be fully keyboard accessible and compatible with screen readers, adhering to WCAG 2.1 AA standards as per REQ-UI-001.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user can only have one active data export request at a time.

### 5.1.3 Enforcement Point

Backend API, upon receiving a new request.

### 5.1.4 Violation Handling

The API will reject the new request with a 409 Conflict status code if an existing request is in a 'pending' or 'processing' state.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Data export download links must expire after a predefined period (e.g., 24 hours).

### 5.2.3 Enforcement Point

Secure storage service (e.g., AWS S3 pre-signed URL generation).

### 5.2.4 Violation Handling

The storage service will deny access to the object after the expiry time. The application will show a user-friendly 'Link Expired' page.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-052

#### 6.1.1.2 Dependency Reason

A user registration system must exist to have a 'registered user'.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

A login system is required for a user to access their account settings.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-057

#### 6.1.3.2 Dependency Reason

A user profile/account management page is the logical location for the UI of this feature.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint to initiate the request.
- Asynchronous job processing system (e.g., AWS SQS and Lambda).
- Secure, private file storage (e.g., AWS S3).
- Email delivery service (e.g., AWS SES).
- Database access to all user-related tables (`users`, `custom_modes`, `user_variables`, `calculation_history`).

## 6.3.0.0 Data Dependencies

- Requires access to the complete data model for a given user as defined in REQ-DAT-001.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The API call to initiate the request must respond in under 200ms (P95).
- The background job should be designed to handle large data sets without timing out (e.g., a user with thousands of history items).

## 7.2.0.0 Security

- The API endpoint must be protected and only allow a user to request their own data.
- The generated data file must be stored in a private, non-publicly accessible location (e.g., private S3 bucket).
- Access to the file must be granted only through a secure, time-limited, single-use token or pre-signed URL.
- The process must be logged for audit purposes.

## 7.3.0.0 Usability

- The process should be simple and require minimal steps for the user.
- Communication about the process status (request received, email sent) must be clear and timely.

## 7.4.0.0 Accessibility

- All UI components must meet WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- The feature must work on all supported browsers as defined in REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires orchestration of multiple AWS services (API Gateway, Lambda, SQS, S3, SES).
- Asynchronous workflow requires state management and robust error handling.
- Data aggregation logic must efficiently query multiple tables for a single user.
- Security implementation (IAM roles, S3 bucket policies, pre-signed URLs) must be precise to prevent data leaks.

## 8.3.0.0 Technical Risks

- Incorrect IAM permissions could prevent the background job from accessing the database or writing to S3.
- A bug in the data aggregation query could lead to incomplete data exports or, critically, data leakage between users.
- Failure to handle errors in the background job could leave requests in a permanently 'pending' state.

## 8.4.0.0 Integration Points

- AWS Cognito for user authentication/authorization at the API Gateway.
- AWS SQS for queuing export jobs.
- AWS Lambda for executing the data aggregation and file generation.
- Amazon RDS (PostgreSQL) for data retrieval.
- AWS S3 for temporary, secure storage of the export file.
- AWS SES for sending the notification email.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify the full end-to-end happy path from request to download.
- Test the data integrity and completeness of the final JSON file against a known data set.
- Test all error conditions: duplicate request, expired link, job failure.
- Perform security testing to ensure a user cannot access another user's data export endpoint or file.

## 9.3.0.0 Test Data Needs

- A test user account with a populated history, several defined variables, and at least two custom modes.
- A test user account with no data to test the empty-state export.
- A test user account with a large volume of data to test performance.

## 9.4.0.0 Testing Tools

- Jest for unit tests.
- Supertest for API integration tests.
- Cypress for E2E testing of the request flow.
- AWS SDK mocks for testing service integrations.
- A tool like Mailosaur or a custom email-checking solution for E2E email verification.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >85% coverage for the new logic
- E2E tests for the request initiation flow are passing
- Security review of the IAM roles, S3 bucket policy, and pre-signed URL generation logic is completed and approved
- Infrastructure changes (SQS, S3 bucket, etc.) are defined in Terraform (IaC)
- Documentation for the new API endpoint and background job is created/updated
- Story deployed and verified in the staging environment by QA

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a high-priority feature due to its legal compliance implications.
- Requires infrastructure setup (IaC) which may need to be done as a prerequisite task.
- The work can be split between frontend (UI components) and backend (API and worker logic), allowing for parallel development.

## 11.4.0.0 Release Impact

- This feature is a key component for meeting GDPR/CCPA compliance and should be included in the next major release.

