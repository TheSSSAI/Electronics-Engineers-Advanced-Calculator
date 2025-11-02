# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-043 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Write formulas for a custom mode |
| As A User Story | As a registered user creating a custom calculation... |
| User Persona | A registered user, likely an engineer, student, or... |
| Business Value | This is the core functionality of the user-extensi... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Creation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Happy Path: User enters a valid formula using defined variables

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is on the 'Formulas' step of the custom mode creation wizard and has defined an input variable 'length' and an output variable 'area'

### 3.1.5 When

The user enters the formula 'area = length * length' into the formula editor

### 3.1.6 Then

The system validates the formula as syntactically correct and displays no error messages.

### 3.1.7 Validation Notes

Verify that the UI shows a success state or absence of errors. The state for the custom mode definition should be updated to include this valid formula.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User enters a valid formula using allowed functions and constants

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user is on the 'Formulas' step and has defined an input 'radius' and an output 'circumference'

### 3.2.5 When

The user enters the formula 'circumference = 2 * pi * sqrt(radius)'

### 3.2.6 Then

The system validates the formula as correct, recognizing 'pi' as a valid constant and 'sqrt' as a valid function from the allow-list defined in REQ-FRX-001.

### 3.2.7 Validation Notes

Check against the official allow-list: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `log`, `ln`, `exp`, `sqrt`, `pi`, `e`, `k`, `e_charge`.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Error Condition: User enters a formula with a syntax error

### 3.3.3 Scenario Type

Error_Condition

### 3.3.4 Given

The user is in the formula editor

### 3.3.5 When

The user enters a formula with a mismatched parenthesis, such as 'output = (5 + inputA'

### 3.3.6 Then

The system provides immediate, non-blocking visual feedback indicating a syntax error and a helpful message like 'Mismatched parenthesis'.

### 3.3.7 Validation Notes

The user should be able to continue typing to correct the error without dismissing any pop-ups. The 'Next' or 'Save' button for the wizard should be disabled.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Error Condition: User enters a formula with an undefined variable

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The user has defined an input variable 'length' but not 'width'

### 3.4.5 When

The user enters the formula 'area = length * width'

### 3.4.6 Then

The system provides immediate feedback highlighting 'width' and displaying an error message like 'Variable "width" is not defined'.

### 3.4.7 Validation Notes

The validation logic must have access to the list of variables defined in the previous step (US-042).

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Error Condition: User enters a formula with a disallowed function

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The user is in the formula editor

### 3.5.5 When

The user attempts to enter a formula containing a JavaScript function not on the allow-list, such as 'result = eval(input)' or 'result = alert(1)'

### 3.5.6 Then

The system provides immediate feedback, highlighting the disallowed function and displaying an error message like 'Function "eval" is not allowed'.

### 3.5.7 Validation Notes

This is a critical security check. The parser must strictly enforce the allow-list from REQ-FRX-001.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

UI Interaction: Formula editor provides syntax highlighting

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

The user is in the formula editor and has defined variables 'inputA' and 'outputB'

### 3.6.5 When

The user types the formula 'outputB = sin(inputA) + pi'

### 3.6.6 Then

The UI should render 'outputB' and 'inputA' in one color (as user variables), 'sin' in another color (as a function), and 'pi' in a third color (as a constant).

### 3.6.7 Validation Notes

Verify that numbers, operators, and comments (if supported) also have distinct styling for readability.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Edge Case: User attempts to assign a value to an input variable

### 3.7.3 Scenario Type

Edge_Case

### 3.7.4 Given

The user has defined 'inputA' as an input variable and 'outputB' as an output variable

### 3.7.5 When

The user enters the formula 'inputA = outputB / 2'

### 3.7.6 Then

The system should display an error message stating 'Cannot assign a value to an input variable'.

### 3.7.7 Validation Notes

The parser must differentiate between input and output variables and enforce that formulas only assign values to output variables.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A multi-line text input area, preferably a rich code editor component (e.g., Monaco, CodeMirror).
- A dedicated area next to or below the editor to display validation errors in real-time.
- A static or pop-over element that lists all available user-defined variables for easy reference.
- A static or pop-over element that lists all allowed functions and constants (from REQ-FRX-001).

## 4.2.0 User Interactions

- As the user types, the formula is validated in real-time.
- Syntax, variables, functions, and constants are highlighted with different colors.
- Error messages appear instantly as invalid syntax is typed and disappear once corrected.
- The user can add multiple formulas, each on a new line, corresponding to each defined output variable.

## 4.3.0 Display Requirements

- The current formula(s) being edited.
- Clear, human-readable error messages.
- A clear indication of which variables are inputs and which are outputs.

## 4.4.0 Accessibility Needs

- The formula editor must be keyboard accessible.
- Syntax highlighting colors must have sufficient contrast.
- Error messages must be associated with the input field and be readable by screen readers.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-FRX-001

### 5.1.2 Rule Description

Formulas can only use functions and constants from the explicit allow-list defined in REQ-FRX-001.

### 5.1.3 Enforcement Point

Client-side during real-time validation and server-side before saving the custom mode definition.

### 5.1.4 Violation Handling

Display a clear error message to the user identifying the disallowed item. Prevent saving the mode.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-FRX-002

### 5.2.2 Rule Description

Formulas can only reference variables that have been defined as inputs or outputs for the current custom mode.

### 5.2.3 Enforcement Point

Client-side during real-time validation and server-side before saving.

### 5.2.4 Violation Handling

Display an error message identifying the undefined variable. Prevent saving the mode.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-FRX-003

### 5.3.2 Rule Description

A formula must assign a value to an output variable. It is invalid to assign a value to an input variable.

### 5.3.3 Enforcement Point

Client-side during real-time validation and server-side before saving.

### 5.3.4 Violation Handling

Display an error message indicating that input variables are read-only within formulas. Prevent saving the mode.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

The custom mode creation wizard, which hosts the formula editor, must exist first.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-042

#### 6.1.2.2 Dependency Reason

The user must be able to define input and output variables, as these are the building blocks used within the formulas.

## 6.2.0.0 Technical Dependencies

- A client-side JavaScript library for parsing mathematical expressions (e.g., math.js, ANTLR.js) or a custom-built parser.
- A rich text/code editor component (e.g., Monaco, CodeMirror) for syntax highlighting and a superior editing experience.
- Integration with the application's state management (Redux Toolkit) to access the list of defined variables for the mode-in-progress.

## 6.3.0.0 Data Dependencies

- Requires the list of defined input and output variables (name, type) from the current user session for the mode being created.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Real-time validation and syntax highlighting in the editor must complete in under 100ms to avoid noticeable lag for the user as they type.

## 7.2.0.0 Security

- The client-side validation parser must be secure and not vulnerable to injection attacks that could compromise the user's browser session.
- The validation logic must strictly enforce the function allow-list as a first line of defense before the formula is ever sent to the secure backend sandbox for execution.

## 7.3.0.0 Usability

- Error messages must be clear, specific, and guide the user toward a solution.
- The editor should be intuitive for users familiar with spreadsheet formulas or basic programming.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as per REQ-UI-001.

## 7.5.0.0 Compatibility

- The formula editor and its validation logic must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

High

## 8.2.0.0 Complexity Factors

- Implementing or integrating a robust and performant language parser for real-time validation.
- Integrating a rich code editor component and customizing its theme and language definition for our specific use case.
- Ensuring the client-side validation rules are perfectly synchronized with the backend `isolated-vm` sandbox environment's capabilities to prevent discrepancies.

## 8.3.0.0 Technical Risks

- The chosen parsing library could be too large, negatively impacting application bundle size and load times.
- Maintaining sync between client-side validation and the backend sandbox allow-list could become a source of bugs if not managed carefully through a shared configuration.
- Underestimating the effort to create a seamless and intuitive UI for error feedback and variable/function discoverability.

## 8.4.0.0 Integration Points

- The custom mode creation wizard's state.
- The backend API endpoint that receives and saves the final custom mode definition (JSONB format as per REQ-DAT-001).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Security
- Accessibility

## 9.2.0.0 Test Scenarios

- Test every allowed function and constant individually.
- Test complex nested formulas.
- Test all documented syntax errors (mismatched parens, invalid operators, etc.).
- Test all validation rules (undefined variables, disallowed functions, assignment to inputs).
- End-to-end test: create a mode, define variables, write a valid formula, save the mode, then launch and use it to confirm the formula was saved correctly.

## 9.3.0.0 Test Data Needs

- A collection of valid formula strings of varying complexity.
- A collection of invalid formula strings, each targeting a specific validation rule.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests of the editor and validation logic.
- Cypress for end-to-end testing of the wizard flow.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests for the formula parser/validator achieve >90% coverage
- Component tests for the formula editor UI are implemented
- End-to-end tests for the formula step in the wizard are passing
- User interface reviewed and approved by the design team
- Performance of the real-time validation meets requirements
- Security review of the parsing logic is complete
- Accessibility of the editor and error messages is verified
- Documentation for developers on how to extend the list of allowed functions is created
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

13

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a large, complex story that may span a full sprint for one developer or could be broken down into smaller technical tasks (e.g., 'Spike: Evaluate Parsers', 'Implement Editor UI', 'Integrate Validation Logic').
- Requires a developer with strong frontend and logical-parsing skills.

## 11.4.0.0 Release Impact

- This story is a critical blocker for the entire custom mode feature set. No custom modes can be fully created or used until this is complete.

