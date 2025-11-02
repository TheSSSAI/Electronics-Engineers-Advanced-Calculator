# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-020 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Define and persist a custom user variable |
| As A User Story | As a registered user, I want to assign the result ... |
| User Persona | Registered User (e.g., Engineer, Scientist, Studen... |
| Business Value | Increases user efficiency and reduces errors by al... |
| Functional Area | Core Calculator & User Persistence |
| Story Theme | User-Defined Variables |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Successfully define a new variable with a numeric value

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user on the main calculator view

### 3.1.5 When

I type the expression 'width = 15.5' and execute the calculation

### 3.1.6 Then

The main display shows the result '15.5'

### 3.1.7 And

A success notification (e.g., a toast message) confirms 'Variable width saved.' is briefly displayed

### 3.1.8 Validation Notes

Verify the API call to save the variable is successful (2xx response). Verify the variable appears in the user's variable list (related to US-022).

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Successfully define a new variable from an expression

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user

### 3.2.5 When

I type the expression 'area = 10 * pi' and execute the calculation

### 3.2.6 Then

The main display shows the result '31.4159...'

### 3.2.7 And

A new variable named 'area' with the calculated value is persisted to my user account

### 3.2.8 Validation Notes

Verify the backend correctly evaluates the expression before saving the resulting numeric value.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Update (overwrite) an existing variable

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in user and have previously defined a variable 'width = 15.5'

### 3.3.5 When

I type the expression 'width = 20' and execute the calculation

### 3.3.6 Then

The main display shows the result '20'

### 3.3.7 And

The value of the variable 'width' is updated to 20 in my user account

### 3.3.8 Validation Notes

Verify the backend performs an UPDATE operation rather than an INSERT for an existing variable name for the same user.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempt to define a variable with an invalid name (starts with a number)

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in user

### 3.4.5 When

I type the expression '2x = 100'

### 3.4.6 Then

The system displays a clear, non-destructive error message: 'Invalid variable name. Names must start with a letter.'

### 3.4.7 And

No API call is made to the backend to save a variable

### 3.4.8 Validation Notes

This validation should occur on the client-side before any API call is attempted.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to define a variable with an invalid name (contains special characters)

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am a logged-in user

### 3.5.5 When

I type the expression 'my-var = 50'

### 3.5.6 Then

The system displays a clear, non-destructive error message: 'Invalid variable name. Names can only contain letters, numbers, and underscores.'

### 3.5.7 And

The input field retains the text 'my-var = 50'

### 3.5.8 Validation Notes

Client-side validation is primary. Backend must also enforce this rule and return a 400 Bad Request if the client-side validation is bypassed.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempt to define a variable using a reserved keyword

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

I am a logged-in user

### 3.6.5 When

I type the expression 'cos = 90'

### 3.6.6 Then

The system displays a clear, non-destructive error message: ''cos' is a reserved keyword and cannot be used as a variable name.'

### 3.6.7 And

The input field retains the text 'cos = 90'

### 3.6.8 Validation Notes

The list of reserved keywords includes all built-in functions (sin, cos, log, etc.) and constants (pi, e, etc.).

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempt to define a variable with an invalid expression

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

I am a logged-in user

### 3.7.5 When

I type the expression 'height = 5 + / 2' and attempt to execute

### 3.7.6 Then

The system displays a 'Syntax Error' message related to the expression evaluation

### 3.7.7 And

No variable named 'height' is created or updated

### 3.7.8 Validation Notes

The existing expression evaluation error handling should be triggered.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Define a variable using another existing variable

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

I am a logged-in user and have previously defined 'width = 20'

### 3.8.5 When

I type the expression 'length = width * 2' and execute

### 3.8.6 Then

The main display shows the result '40'

### 3.8.7 And

A new variable named 'length' with the value 40 is persisted to my user account

### 3.8.8 Validation Notes

This depends on US-021 being implemented to resolve 'width' during the expression evaluation.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Main calculator input field
- Toast/Notification component for success/error feedback

## 4.2.0 User Interactions

- User types 'variableName = expression' into the input field.
- Upon execution (e.g., pressing Enter or '=' button), the system parses the input.
- If it's a variable assignment, the system evaluates the expression and triggers a save operation.
- The system provides immediate visual feedback on the outcome (success notification or error message).

## 4.3.0 Display Requirements

- Error messages must be user-friendly and displayed without clearing the user's original input.
- Success notifications should be non-intrusive and disappear automatically after a few seconds.

## 4.4.0 Accessibility Needs

- All feedback (success and error messages) must be accessible to screen readers using ARIA live regions.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-VAR-001

### 5.1.2 Rule Description

Variable names must start with an alphabetic character (a-z, A-Z).

### 5.1.3 Enforcement Point

Client-side (for immediate feedback) and Backend API (for data integrity).

### 5.1.4 Violation Handling

Display a validation error to the user and reject the request on the backend with a 400 status code.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-VAR-002

### 5.2.2 Rule Description

Variable names may only contain alphanumeric characters (a-z, A-Z, 0-9) and the underscore character (_).

### 5.2.3 Enforcement Point

Client-side and Backend API.

### 5.2.4 Violation Handling

Display a validation error to the user and reject the request on the backend with a 400 status code.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-VAR-003

### 5.3.2 Rule Description

Variable names cannot be the same as any built-in function (e.g., sin, cos, log) or constant (e.g., pi, e).

### 5.3.3 Enforcement Point

Client-side and Backend API.

### 5.3.4 Violation Handling

Display a validation error to the user and reject the request on the backend with a 400 status code.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-VAR-004

### 5.4.2 Rule Description

Variable names are case-sensitive.

### 5.4.3 Enforcement Point

Backend API and Database.

### 5.4.4 Violation Handling

'myVar' and 'myvar' are treated as two distinct variables.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-053

#### 6.1.1.2 Dependency Reason

User must be authenticated to have an account to which variables can be saved.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-021

#### 6.1.2.2 Dependency Reason

The expression evaluation logic must be able to resolve existing variables to support creating variables based on others (AC-008).

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-022

#### 6.1.3.2 Dependency Reason

A UI to view saved variables is required for the user to confirm that the variable definition was successful.

## 6.2.0.0 Technical Dependencies

- A backend API endpoint (e.g., POST /api/v1/variables) must exist to handle the creation and updating of variables.
- The `user_variables` database table as defined in REQ-DAT-001 must be created via migration.
- The secure sandboxed expression evaluation service (AWS Lambda) must be available to the backend.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

- AWS Cognito for user authentication to get the user ID for the API request.

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The client-side parsing to detect a variable assignment must not introduce any noticeable latency to the user's typing.
- The API call to save/update a variable should have a P95 response time of less than 300ms.

## 7.2.0.0 Security

- All input for variable names and expressions must be sanitized on the backend to prevent injection attacks (e.g., SQLi, NoSQL injection).
- The API endpoint must be protected and require a valid JWT from an authenticated user.
- The backend must enforce that a user can only create or modify variables associated with their own user ID.

## 7.3.0.0 Usability

- The process of defining a variable should feel seamless and integrated into the normal calculation flow.
- Error feedback must be immediate, clear, and actionable.

## 7.4.0.0 Accessibility

- WCAG 2.1 Level AA standards must be met for all UI elements and feedback mechanisms.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires full-stack implementation: client-side parsing, API endpoint creation, backend business logic, and database interaction.
- Integration with the secure expression evaluation service for the right-hand side of the assignment.
- Requires robust validation logic for variable names on both client and server.
- Database logic needs to handle both creation of new variables and updating of existing ones (UPSERT logic).

## 8.3.0.0 Technical Risks

- The client-side regular expression for detecting variable assignments could be complex and needs to handle various spacings (e.g., 'x=5', 'x = 5').
- Ensuring the list of reserved keywords is kept in sync between the frontend and backend to provide consistent validation.

## 8.4.0.0 Integration Points

- Frontend Calculator Input Component
- Backend Variables API Controller
- Backend Authentication Middleware
- Secure Formula Execution Service (Lambda)
- PostgreSQL `user_variables` table

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security

## 9.2.0.0 Test Scenarios

- Verify all acceptance criteria, including all happy paths and error conditions.
- Test variable name validation with a comprehensive set of valid and invalid names.
- Test overwriting an existing variable and confirm the value is updated in the database.
- E2E Test: Log in, create variable 'a', create variable 'b' using 'a', use 'b' in a final calculation, log out, log back in, and verify all variables are still present and usable.
- Security Test: Attempt to create a variable for another user by manipulating API calls; this should be forbidden.

## 9.3.0.0 Test Data Needs

- A test user account with no initial variables.
- A test user account with pre-existing variables to test the update/overwrite functionality.

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend Integration)
- Cypress (E2E)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit test coverage for new logic is at or above the project standard (85%)
- API integration tests are implemented and passing
- E2E tests covering the core user flows are implemented and passing
- User interface changes are reviewed and approved by the design/product team
- API endpoint is documented in the OpenAPI specification
- Security requirements have been validated (e.g., proper authorization checks)
- Story has been deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a foundational piece for the entire variable feature set. It should be prioritized early in the development of user-specific features.
- Should be planned in the same sprint as US-021 (Use a variable) and US-022 (View variables) to deliver a complete, usable feature to users.

## 11.4.0.0 Release Impact

- This feature is a key differentiator for registered users and a major milestone in creating a personalized user experience.

