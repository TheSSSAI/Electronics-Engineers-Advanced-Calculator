# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-047 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Launch and use a custom calculation mode |
| As A User Story | As a registered user who has created a custom calc... |
| User Persona | A registered user (e.g., engineer, student, hobbyi... |
| Business Value | This story actualizes the core value of the user-e... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Execution |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: Successfully launch and calculate a custom mode

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user on the 'Custom Mode Management' screen and I have a valid custom mode with defined inputs, outputs, and formulas.

### 3.1.5 When

I click the 'Launch' action for a specific custom mode.

### 3.1.6 Then

The application navigates to a dedicated view for that mode, dynamically rendering all defined input and output fields with their correct labels and control types (e.g., text field, slider).

### 3.1.7 Validation Notes

Verify the UI correctly reflects the mode's JSON definition stored in the database.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Happy Path: Perform a successful calculation

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am viewing a launched custom mode with all required input fields.

### 3.2.5 When

I enter valid numerical values into all required input fields and trigger the calculation (via 'Calculate' button or onBlur event as defined in REQ-FRX-001).

### 3.2.6 Then

A secure API call is made to the backend formula execution service with the input values.

### 3.2.7 And

The corresponding output fields are populated with the correct calculated results returned from the API.

### 3.2.8 Validation Notes

Test with a known formula (e.g., Ohm's Law) and verify the output matches the expected mathematical result. Check network tab for the API call and response.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

UI Feedback: Display loading state during calculation

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

I have entered valid data into a custom mode.

### 3.3.5 When

I trigger the calculation.

### 3.3.6 Then

A loading indicator (e.g., spinner) is displayed in the output area, and the 'Calculate' button is disabled.

### 3.3.7 And

Once the API call completes (successfully or with an error), the loading indicator is removed and the button is re-enabled.

### 3.3.8 Validation Notes

Use browser developer tools to throttle the network connection to make the loading state visible and verifiable.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: Handle invalid (non-numeric) user input

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am viewing a launched custom mode.

### 3.4.5 When

I enter non-numeric text (e.g., 'abc') into a numerical input field.

### 3.4.6 Then

The input field displays a client-side validation error message.

### 3.4.7 And

The calculation cannot be triggered (e.g., 'Calculate' button is disabled).

### 3.4.8 Validation Notes

Verify that no API call is made to the backend when client-side validation fails.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: Handle calculation errors from the backend

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am viewing a custom mode with a formula that can result in a mathematical error (e.g., `output = 1 / input`).

### 3.5.5 When

I enter a value that will cause an error (e.g., `input = 0`) and trigger the calculation.

### 3.5.6 Then

The API returns a structured error response (as per REQ-API-001).

### 3.5.7 And

My original input values are preserved in the input fields.

### 3.5.8 Validation Notes

Mock the API response to return a calculation error and verify the UI handles it gracefully.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Performance: Calculation response time

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

I am using a custom mode with a moderately complex formula.

### 3.6.5 When

I trigger a calculation.

### 3.6.6 Then

The total time from triggering the calculation to the result being displayed in the UI has a 95th percentile (P95) of less than 500ms, as specified in REQ-NFP-001.

### 3.6.7 Validation Notes

This must be verified using performance testing tools like Lighthouse or by observing network timings in browser developer tools under simulated network conditions.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Accessibility: Keyboard navigation and screen reader support

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

A custom mode is launched and displayed.

### 3.7.5 When

I use only the keyboard to navigate the interface.

### 3.7.6 Then

I can tab between all input fields and the 'Calculate' button in a logical order.

### 3.7.7 And

When a calculation is complete, the results in the output fields are announced by the screen reader.

### 3.7.8 Validation Notes

Test using keyboard-only navigation and a screen reader tool (e.g., NVDA, VoiceOver).

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated view/screen for the active custom mode.
- Dynamically generated input controls (text fields, sliders as per REQ-FRX-001) based on the mode's definition.
- Dynamically generated read-only fields for outputs.
- Clear labels for all input and output fields, using the names defined by the user.
- A 'Calculate' button (if the mode is not configured for real-time updates).
- A loading state indicator (e.g., spinner).
- An area to display calculation error messages.

## 4.2.0 User Interactions

- User enters numerical data into input fields.
- Calculation is triggered either by clicking a 'Calculate' button or on an input's onBlur event.
- The UI prevents further input/actions while a calculation is in progress.
- The UI provides immediate client-side validation for non-numeric input.

## 4.3.0 Display Requirements

- The name of the custom mode should be displayed as the title of the view.
- The optional description of the mode should be visible.
- Units, if defined for variables, should be displayed next to their respective input/output fields.

## 4.4.0 Accessibility Needs

- All form controls must have `aria-` attributes and associated labels for screen reader compatibility (WCAG 2.1 AA).
- Focus management must be logical for keyboard-only users.
- Sufficient color contrast for all text, labels, and error messages.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

A user can only execute custom modes that they own.

### 5.1.3 Enforcement Point

Backend API: Before fetching the mode definition and executing the formula, the service must verify that the authenticated user's ID matches the `user_id` associated with the requested custom mode.

### 5.1.4 Violation Handling

If a user attempts to execute a mode they do not own, the API must return a `403 Forbidden` status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

All user-defined formulas must be executed within the secure, isolated sandbox as defined in REQ-CON-001.

### 5.2.3 Enforcement Point

Backend: The formula execution service (AWS Lambda).

### 5.2.4 Violation Handling

Any attempt by a formula to access network, filesystem, or exceed resource limits will be terminated by the sandbox, and an error will be returned to the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

A custom mode must be created before it can be launched and used.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-042

#### 6.1.2.2 Dependency Reason

The UI for the launched mode is dynamically generated from the variables defined in this story.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-043

#### 6.1.3.2 Dependency Reason

The calculation engine requires the formulas defined in this story to produce a result.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-046

#### 6.1.4.2 Dependency Reason

The user needs a list of their modes to select one to launch.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (`/api/v1/modes/{modeId}/execute`) that accepts input data and returns a calculated result.
- The secure AWS Lambda function for formula execution using `isolated-vm` must be deployed and callable by the backend service.
- Frontend state management (e.g., Redux Toolkit) to handle the dynamic state of the custom mode view.
- A flexible frontend component capable of rendering a form from a JSON definition.

## 6.3.0.0 Data Dependencies

- Requires access to the `custom_modes` table in the PostgreSQL database to retrieve the mode's definition (name, description, inputs, outputs, formulas).

## 6.4.0.0 External Dependencies

- AWS Cognito for user authentication to secure the API endpoint.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- P95 API response time for the calculation endpoint must be < 500ms (REQ-NFP-001).
- Client-side UI updates and rendering must complete in < 50ms (REQ-NFP-001).

## 7.2.0.0 Security

- All API communication must be over HTTPS (TLS 1.2+).
- The API endpoint must be protected and require a valid JWT from the authenticated user.
- Backend must enforce that a user can only execute their own custom modes (RBAC).

## 7.3.0.0 Usability

- The process of entering data and getting a result should be fast and intuitive.
- Error messages must be clear and help the user correct the problem.

## 7.4.0.0 Accessibility

- The entire feature must comply with WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- The feature must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend: Implementing a dynamic form renderer that can handle various UI control types based on a JSON schema.
- Frontend: Managing the complex state of inputs, outputs, loading, and error states for the dynamic view.
- Backend: Orchestrating the flow: authenticate user, fetch mode definition, validate inputs, invoke Lambda, handle response/errors.
- Integration: Ensuring a robust and well-defined API contract between the React client and the NestJS backend.

## 8.3.0.0 Technical Risks

- The dynamic UI rendering logic could become overly complex if not designed with a scalable pattern.
- Potential for latency in the AWS Lambda cold start, which could impact the P95 performance requirement. Provisioned concurrency might be needed.

## 8.4.0.0 Integration Points

- React Frontend <-> NestJS Backend API
- NestJS Backend API <-> AWS Lambda Formula Execution Service
- NestJS Backend API <-> PostgreSQL Database (for mode definitions)
- NestJS Backend API <-> AWS Cognito (for token validation)

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Performance
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify calculation with simple and complex formulas (e.g., single operation, multiple nested operations with trigonometry).
- Test error handling for mathematical errors (division by zero, log of a negative number).
- Test UI rendering with a mode that has many inputs and outputs.
- Test security by attempting to execute another user's custom mode via a direct API call.
- Test the full user flow from login -> mode list -> launch -> calculate -> verify result.

## 9.3.0.0 Test Data Needs

- User accounts with pre-defined custom modes of varying complexity.
- A custom mode definition designed to cause a division-by-zero error.
- A custom mode definition that uses all supported mathematical functions from the allow-list (REQ-FRX-001).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Unit/Integration)
- Cypress (E2E)
- Lighthouse/k6 (Performance)
- NVDA/VoiceOver (Accessibility)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code for both frontend and backend has been peer-reviewed and merged.
- Unit test coverage for new logic meets the project standard (85% for backend).
- E2E tests covering the happy path and key error conditions are implemented and passing.
- The dynamic UI is fully responsive across all target device sizes.
- Performance testing confirms the P95 latency requirement is met.
- Accessibility audit (automated and manual) confirms WCAG 2.1 AA compliance.
- API documentation (OpenAPI) for the new endpoint is generated and accurate.
- The feature is successfully deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

8

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a cornerstone of the custom mode feature set and unblocks user value. It should be prioritized as soon as its dependencies are met.
- Requires close collaboration between frontend and backend developers to define and implement the API contract early.

## 11.4.0.0 Release Impact

This feature is critical for the initial launch (v1.0). The user-extensible functionality is incomplete without it.

