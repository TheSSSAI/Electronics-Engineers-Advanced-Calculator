# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-051 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Import a custom mode from a file |
| As A User Story | As a registered user, I want to import a custom mo... |
| User Persona | Registered user (e.g., engineer, scientist, studen... |
| Business Value | Enhances user collaboration and tool reusability, ... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successful import of a valid custom mode file

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user on the 'Custom Mode Management' screen

### 3.1.5 When

I click the 'Import' button, select a valid custom mode JSON file, and confirm the upload

### 3.1.6 Then

The system validates the file, saves the new mode to my account, and displays a success message: 'Custom mode "[Mode Name]" imported successfully.'

### 3.1.7 Validation Notes

Verify the new mode appears in the list of custom modes on the UI and is persisted in the `custom_modes` database table for the correct `user_id`.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Attempt to upload a file with an incorrect file extension

### 3.2.3 Scenario Type

Error_Condition

### 3.2.4 Given

I am a logged-in user on the 'Custom Mode Management' screen

### 3.2.5 When

I interact with the file selection dialog initiated by the 'Import' button

### 3.2.6 Then

The dialog should be filtered to only allow selection of files with a '.json' extension.

### 3.2.7 Validation Notes

If a non-JSON file is somehow selected (e.g., by dragging and dropping), the client-side logic must reject it before upload and show an error: 'Invalid file type. Please select a .json file.'

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Attempt to upload a file with malformed JSON content

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

I am a logged-in user on the 'Custom Mode Management' screen

### 3.3.5 When

I upload a '.json' file that contains a syntax error (e.g., a trailing comma or missing brace)

### 3.3.6 Then

The system rejects the file and displays a user-friendly error message: 'Import failed: The file is not a valid JSON document.'

### 3.3.7 Validation Notes

Verify the error is handled gracefully and no partial data is saved. The API should return a 400 Bad Request status.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to upload a JSON file with an invalid data schema

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in user on the 'Custom Mode Management' screen

### 3.4.5 When

I upload a valid JSON file that is missing a required property (e.g., 'name') or contains a property with an incorrect data type (e.g., 'inputs' is not an array)

### 3.4.6 Then

The backend validation fails and the system displays a specific error message: 'Import failed: The mode definition is invalid. Missing required property: name.'

### 3.4.7 Validation Notes

The API should return a 422 Unprocessable Entity status with a descriptive error message. Test with various schema violations.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to upload a custom mode with an insecure formula

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in user on the 'Custom Mode Management' screen

### 3.5.5 When

I upload a custom mode JSON file where a formula contains a disallowed function (e.g., 'eval()' or 'window.location')

### 3.5.6 Then

The backend security validation rejects the import and displays an error message: 'Import failed: The formula contains unsupported or insecure functions.'

### 3.5.7 Validation Notes

Verify that the formula is checked against the allow-list defined in REQ-FRX-001. This check must occur in the secure Lambda environment.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Importing a custom mode with a name that already exists

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am a logged-in user and I have a custom mode named 'Resonance Calculator'

### 3.6.5 When

I import a valid custom mode file that also has the name 'Resonance Calculator'

### 3.6.6 Then

The system successfully imports the new mode, automatically renaming it to 'Resonance Calculator (1)'.

### 3.6.7 Validation Notes

Verify the success message informs the user of the renaming: 'Mode imported successfully and renamed to "Resonance Calculator (1)" to avoid a conflict.' Check the database to confirm the new, renamed entry.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Importing a custom mode with an incompatible schema version

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

I am a logged-in user and the application supports schema version '1.0'

### 3.7.5 When

I import a custom mode file that specifies '"schema_version": "2.0"' in its JSON content

### 3.7.6 Then

The system rejects the import and displays a clear error message: 'Import failed: This mode file is not compatible with the current application version.'

### 3.7.7 Validation Notes

Verify this check is performed early in the backend validation process. Test with both older and newer version numbers.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Import' button on the Custom Mode Management screen.
- A standard browser file selection dialog.
- A loading indicator/spinner displayed during the upload and validation process.
- Toast/notification component to display success or error messages.

## 4.2.0 User Interactions

- Clicking 'Import' opens the file dialog.
- Selecting a file and clicking 'Open' triggers the upload process.
- The UI should provide immediate feedback on the outcome of the import operation.

## 4.3.0 Display Requirements

- Success and error messages must be clear, concise, and user-friendly.
- Upon successful import, the list of custom modes must refresh automatically to include the new mode.

## 4.4.0 Accessibility Needs

- The 'Import' button must be keyboard accessible and have a proper ARIA label.
- Feedback messages must be announced by screen readers using ARIA live regions.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-IMP-001

### 5.1.2 Rule Description

Imported file must be a valid JSON document.

### 5.1.3 Enforcement Point

Client-side (initial check) and Backend (authoritative check).

### 5.1.4 Violation Handling

Reject the upload and display a 'malformed JSON' error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-IMP-002

### 5.2.2 Rule Description

Imported JSON must adhere to the defined custom mode schema, including schema version.

### 5.2.3 Enforcement Point

Backend API.

### 5.2.4 Violation Handling

Reject the import and return a 422 error with details of the schema violation.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-IMP-003

### 5.3.2 Rule Description

All formulas within the imported mode must only use functions and constants from the explicit allow-list defined in REQ-FRX-001.

### 5.3.3 Enforcement Point

Backend via secure Lambda sandbox.

### 5.3.4 Violation Handling

Reject the import and return a 422 error with a security warning.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-046

#### 6.1.1.2 Dependency Reason

Requires the Custom Mode Management screen to exist, which is where the 'Import' button will be located.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-050

#### 6.1.2.2 Dependency Reason

The import function must be compatible with the file format generated by the export function. They define a contract.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-053

#### 6.1.3.2 Dependency Reason

This feature is only available to authenticated users, requiring a login system to be in place.

## 6.2.0.0 Technical Dependencies

- Backend API endpoint for receiving and processing the custom mode JSON.
- Secure AWS Lambda function for formula validation (as per REQ-CON-001).
- Database schema for `custom_modes` must be finalized.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- File upload and validation for a typical custom mode (< 5KB) should complete within 1 second (P95).

## 7.2.0.0 Security

- The backend must treat all uploaded file content as untrusted.
- Robust validation must be performed on the backend to prevent injection attacks or storage of malicious data.
- Formula validation must occur in the isolated sandbox environment as specified in REQ-CON-001.

## 7.3.0.0 Usability

- The import process should be simple and intuitive, requiring minimal steps.
- Error messages must be specific enough to help the user diagnose the problem with their file.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- The feature must work on all supported browsers as defined in REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- The backend validation logic is multi-layered: JSON format, data schema, semantic correctness, and formula security.
- The security validation requires a call to an external service (the AWS Lambda function), adding an integration point.
- Handling various failure modes and providing clear, specific error messages to the user adds complexity.

## 8.3.0.0 Technical Risks

- The formula security parsing could be complex to implement correctly, potentially missing edge cases for malicious code.
- Inconsistent schema definitions between the export feature and the import validator could lead to bugs.

## 8.4.0.0 Integration Points

- Frontend Client <-> Backend API
- Backend API <-> PostgreSQL Database
- Backend API <-> AWS Lambda Formula Validator

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Import a valid file.
- Import a file with malformed JSON.
- Import a file with an invalid schema (missing keys, wrong types).
- Import a file with a disallowed function in a formula.
- Import a file with a conflicting name.
- Import a file with an incompatible schema version.

## 9.3.0.0 Test Data Needs

- A collection of sample JSON files representing each of the test scenarios is required.

## 9.4.0.0 Testing Tools

- Jest for unit tests (frontend and backend).
- Supertest for backend API integration tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria are met and have been validated by QA.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests are written for all new logic, maintaining >= 85% code coverage.
- Integration tests for the API endpoint and its dependencies are implemented and passing.
- E2E tests simulating the user import flow are implemented and passing.
- Security validation logic has been reviewed for potential vulnerabilities.
- The feature is deployed and verified in the `staging` environment.
- Relevant documentation (e.g., in-app help system) has been updated to explain the import feature.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story should be planned in the same or a subsequent sprint as US-050 (Export) to ensure file format compatibility.
- Requires a well-defined JSON schema for custom modes before development can begin.

## 11.4.0.0 Release Impact

- Completes the core feature set for sharing and managing custom modes, significantly enhancing the value of the user-extensible framework.

