# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-042 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Define input and output variables for a custom mod... |
| As A User Story | As a registered user building a custom calculation... |
| User Persona | A registered user (e.g., engineer, student, scient... |
| Business Value | This is a foundational capability for the user-ext... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Creation |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Adding a new input variable with name and unit

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a registered user on the 'Define Variables' step of the custom mode creation wizard

### 3.1.5 When

I click 'Add Input Variable', enter 'Voltage' for the name, and 'V' for the unit

### 3.1.6 Then

a new item representing the input variable appears in the 'Input Variables' list, displaying the name 'Voltage' and unit 'V'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Adding a new output variable with name only

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am on the 'Define Variables' step of the custom mode creation wizard

### 3.2.5 When

I click 'Add Output Variable', enter 'Efficiency' for the name, and leave the unit field blank

### 3.2.6 Then

a new item representing the output variable appears in the 'Output Variables' list, displaying the name 'Efficiency' and no unit.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Deleting a defined variable

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I have already defined an input variable named 'Voltage'

### 3.3.5 When

I click the 'Delete' icon next to the 'Voltage' variable and confirm the action in a confirmation dialog

### 3.3.6 Then

the 'Voltage' variable is removed from the 'Input Variables' list.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to add a variable with a duplicate name

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I have already defined an input variable named 'Resistance'

### 3.4.5 When

I attempt to add a new input or output variable with the name 'Resistance'

### 3.4.6 Then

an inline validation error message 'Variable names must be unique' is displayed, and the variable is not added to the list.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempting to add a variable with an invalid name

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

I am adding a new variable

### 3.5.5 When

I enter an invalid name such as 'My Value' (contains a space), '5th_element' (starts with a number), or 'sin' (a reserved keyword)

### 3.5.6 Then

an inline validation error message is displayed explaining the naming constraints (e.g., 'Name must start with a letter and contain only letters and numbers. Reserved names are not allowed.').

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Wizard progression is blocked without required variables

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

I am on the 'Define Variables' step of the custom mode creation wizard

### 3.6.5 When

I have not defined at least one input variable AND at least one output variable

### 3.6.6 Then

the 'Next: Define Formulas' button is disabled.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Wizard progression is enabled with required variables

### 3.7.3 Scenario Type

Happy_Path

### 3.7.4 Given

I am on the 'Define Variables' step of the custom mode creation wizard

### 3.7.5 When

I have defined at least one input variable AND at least one output variable, and all names are valid

### 3.7.6 Then

the 'Next: Define Formulas' button is enabled.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Editing an existing variable

### 3.8.3 Scenario Type

Happy_Path

### 3.8.4 Given

I have an input variable named 'Voltage' with unit 'V'

### 3.8.5 When

I click the 'Edit' icon, change the name to 'InputVoltage' and the unit to 'mV'

### 3.8.6 Then

the variable in the list updates to display the new name and unit.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A main container for the 'Define Variables' step.
- Two distinct sections, clearly labeled 'Input Variables' and 'Output Variables'.
- An 'Add Input Variable' button within the input section.
- An 'Add Output Variable' button within the output section.
- For each variable: a display row or card showing the name and unit.
- For each variable: 'Edit' and 'Delete' icon buttons.
- When adding/editing: a form with text input fields for 'Variable Name' and 'Unit (Optional)'.
- A confirmation modal/dialog for the delete action.
- Inline validation message areas for the 'Variable Name' input field.

## 4.2.0 User Interactions

- Clicking 'Add' button dynamically adds a new form/row to the corresponding list.
- Variable name validation should occur in real-time as the user types (onBlur or debounced onChange).
- Deleting a variable requires a confirmation step to prevent accidental data loss.
- The lists of variables should be scrollable if the content exceeds the allocated view height.

## 4.3.0 Display Requirements

- A clear count of input and output variables defined.
- The wizard's navigation (e.g., 'Next' button) must clearly indicate its enabled/disabled state.

## 4.4.0 Accessibility Needs

- All buttons, inputs, and controls must be fully keyboard navigable (Tab, Enter, Space).
- All form inputs must have associated `<label>` tags.
- Icon buttons ('Edit', 'Delete') must have `aria-label` attributes for screen readers.
- Validation error messages must be programmatically associated with their respective inputs using `aria-describedby`.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-VAR-001

### 5.1.2 Rule Description

Variable names must be unique across both input and output lists for a given custom mode.

### 5.1.3 Enforcement Point

Client-side validation on input field blur; Server-side validation on form submission.

### 5.1.4 Violation Handling

Display a clear error message to the user; Reject the API request with a 400 Bad Request status.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-VAR-002

### 5.2.2 Rule Description

Variable names must start with a letter and can only contain alphanumeric characters (a-z, A-Z, 0-9). No spaces or special characters allowed.

### 5.2.3 Enforcement Point

Client-side validation (input pattern and real-time check); Server-side validation on submission.

### 5.2.4 Violation Handling

Display a clear error message; Reject the API request.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-VAR-003

### 5.3.2 Rule Description

Variable names cannot be the same as reserved keywords used by the formula execution engine (e.g., sin, cos, tan, pi, e, etc., as defined in REQ-FRX-001).

### 5.3.3 Enforcement Point

Client-side validation against a predefined list; Server-side validation on submission.

### 5.3.4 Violation Handling

Display a clear error message; Reject the API request.

## 5.4.0 Rule Id

### 5.4.1 Rule Id

BR-VAR-004

### 5.4.2 Rule Description

A custom mode must have at least one input variable and at least one output variable to be valid.

### 5.4.3 Enforcement Point

Client-side logic to disable wizard progression; Server-side validation on final submission of the custom mode.

### 5.4.4 Violation Handling

Disable the 'Next' button in the UI; Reject the API request.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-041', 'dependency_reason': "This story implements a specific step within the custom mode creation wizard established in US-041. The wizard's framework and state management must exist first."}

## 6.2.0 Technical Dependencies

- A frontend state management solution (e.g., Redux Toolkit) to manage the wizard's state across steps.
- The backend API endpoint for creating/updating a custom mode must be defined to accept a structured list of variables within the mode's JSONB definition field (as per REQ-DAT-001).
- A shared list of reserved keywords (from REQ-FRX-001) must be available to the frontend for validation.

## 6.3.0 Data Dependencies

- If editing an existing mode, this component requires the mode's current variable definition to be fetched and pre-populated into the UI.

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- UI updates when adding, editing, or deleting variables must feel instantaneous (under 100ms).

## 7.2.0 Security

- All user-provided input (name, unit) must be properly sanitized on the backend before being stored in the database to prevent XSS or other injection attacks.

## 7.3.0 Usability

- The interface for managing variable lists must be intuitive and not require documentation for a first-time user.
- Error messages must be clear, concise, and actionable.

## 7.4.0 Accessibility

- The component must comply with WCAG 2.1 Level AA standards.

## 7.5.0 Compatibility

- The feature must function correctly on all browsers specified in REQ-ENV-001 (latest Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Medium

## 8.2.0 Complexity Factors

- Managing the state of a dynamic list of forms.
- Implementing robust, real-time, client-side validation against multiple rules (uniqueness, format, reserved words).
- Ensuring the component works for both 'create new' (empty state) and 'edit existing' (pre-populated state) scenarios.
- Integrating the component's local state with the parent wizard's global state.

## 8.3.0 Technical Risks

- The list of reserved keywords might change. It should be fetched from the backend or a shared configuration file rather than being hardcoded on the client.
- Poor state management could lead to data loss when navigating back and forth between wizard steps.

## 8.4.0 Integration Points

- This component receives state from the parent wizard component.
- It passes its final state (the list of defined variables) to the next step in the wizard (US-043: Formula Definition).
- On final save, the variable list is serialized as part of the JSON payload to the backend API.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Create a mode with one input and one output.
- Create a mode with multiple inputs and multiple outputs.
- Trigger all validation errors (duplicate, invalid format, reserved word).
- Add, then edit, then delete a variable.
- Load an existing mode for editing and verify variables are pre-populated correctly.
- Navigate back and forth in the wizard to ensure variable definitions are preserved.

## 9.3.0 Test Data Needs

- A predefined list of reserved keywords for validation testing.
- Sample custom mode JSON objects for testing the 'edit' functionality.

## 9.4.0 Testing Tools

- Jest & React Testing Library for unit/integration tests.
- Cypress for E2E tests.
- Axe for accessibility automated checks.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >85% code coverage for the component's logic
- E2E tests for the variable definition flow are passing
- User interface is responsive and has been reviewed by a UX designer
- Accessibility audit (automated and manual keyboard check) passed
- All user-facing strings are externalized for i18n
- Documentation for the component's props and state is created
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

5

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story is a blocker for US-043 (Formula Definition). They should ideally be planned in consecutive sprints, or by developers working in parallel if the interface contract is agreed upon early.
- Requires a clear data contract for the variable object structure (`{name: string, unit: string, type: 'input'|'output'}`).

## 11.4.0 Release Impact

This story is on the critical path for the entire User-Extensible Functionality feature set. The feature cannot be released without it.

