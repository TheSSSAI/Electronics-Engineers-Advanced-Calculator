# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-045 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Customize UI controls for a custom mode |
| As A User Story | As a registered user building a custom calculation... |
| User Persona | A registered user who is actively creating or edit... |
| Business Value | Enhances the user-extensible framework, increasing... |
| Functional Area | User-Extensible Functionality |
| Story Theme | Custom Mode Creation & Management |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Default UI control for new input variables

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a registered user is in the custom mode creation wizard

### 3.1.5 When

the user defines a new input variable

### 3.1.6 Then

the UI control type for that variable defaults to 'Text Field'.

### 3.1.7 Validation Notes

Verify in the wizard UI that the dropdown or selector for control type is pre-set to 'Text Field' upon adding a new input variable.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Selecting the 'Slider' control type reveals configuration options

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

a user is defining an input variable in the custom mode wizard

### 3.2.5 When

the user changes the UI control type from 'Text Field' to 'Slider'

### 3.2.6 Then

the UI dynamically displays new input fields for 'Minimum Value', 'Maximum Value', and 'Step'.

### 3.2.7 Validation Notes

Test the reactivity of the wizard form. The new fields should appear without a page reload.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Configuring and saving a slider control

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the user has selected the 'Slider' control type for an input variable

### 3.3.5 When

the user enters valid values for Minimum (e.g., 0), Maximum (e.g., 100), and Step (e.g., 1) and saves the custom mode

### 3.3.6 Then

the custom mode's definition is successfully saved to the backend, including the control type and its configuration.

### 3.3.7 Validation Notes

Inspect the API request payload to confirm the configuration is sent. Inspect the database or a subsequent API GET request to verify the data was persisted correctly within the mode's JSONB definition.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Rendering the correct UI control when launching a custom mode

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

a user has a saved custom mode with one input configured as a 'Slider' and another as a 'Text Field'

### 3.4.5 When

the user launches this custom mode

### 3.4.6 Then

the UI renders a slider component for the first input and a standard text input field for the second.

### 3.4.7 Validation Notes

Visually inspect the launched custom mode UI. Check the DOM to confirm the correct HTML elements are rendered for each input.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Interacting with a rendered slider updates the input value

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a user has launched a custom mode with a slider input

### 3.5.5 When

the user interacts with the slider to select a value

### 3.5.6 Then

the corresponding numerical value is displayed next to the slider and is correctly used in any calculations triggered by the user.

### 3.5.7 Validation Notes

Move the slider and observe the displayed value. Perform a calculation and verify the result uses the value selected via the slider.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Attempting to save a slider with invalid range configuration

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

a user is configuring a slider control in the wizard

### 3.6.5 When

the user enters a Minimum value that is greater than or equal to the Maximum value and attempts to save

### 3.6.6 Then

a clear validation error message is displayed to the user, and the form submission is prevented.

### 3.6.7 Validation Notes

Enter Min=10, Max=5. Attempt to save. Verify an inline error message like 'Maximum value must be greater than Minimum value' appears.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

Attempting to save a slider with a non-positive step value

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

a user is configuring a slider control in the wizard

### 3.7.5 When

the user enters a Step value of '0' or a negative number and attempts to save

### 3.7.6 Then

a clear validation error message is displayed (e.g., 'Step must be a positive number'), and the form submission is prevented.

### 3.7.7 Validation Notes

Enter Step=0 and Step=-1. Verify a validation error is shown in both cases.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

Changing an input's control type from Slider back to Text Field

### 3.8.3 Scenario Type

Edge_Case

### 3.8.4 Given

a user is editing a custom mode where an input is already configured as a slider

### 3.8.5 When

the user changes that input's control type back to 'Text Field' and saves the mode

### 3.8.6 Then

the saved mode definition no longer contains the min, max, or step configuration for that variable.

### 3.8.7 Validation Notes

Verify via API response or database inspection that the extraneous slider configuration data is removed upon saving.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dropdown menu next to each input variable in the custom mode wizard to select 'Control Type'. Options: 'Text Field', 'Slider'.
- Conditionally displayed input fields for 'Minimum Value', 'Maximum Value', and 'Step' when 'Slider' is selected.
- A functional, accessible slider component in the launched custom mode view.
- A read-only display of the slider's current numerical value next to the slider itself.

## 4.2.0 User Interactions

- Selecting a control type from the dropdown should instantly update the configuration options available for that variable.
- Moving the slider handle should update the displayed value in real-time.
- The calculation should be triggered based on the value from the UI control as per REQ-FRX-001 (onBlur or 'Calculate' button press).

## 4.3.0 Display Requirements

- Validation errors for slider configuration must be displayed inline, next to the problematic fields.

## 4.4.0 Accessibility Needs

- The control type dropdown and slider configuration fields must be fully keyboard navigable and have associated labels for screen readers.
- The rendered slider component must be WCAG 2.1 AA compliant, allowing for keyboard interaction (arrow keys) to change its value.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-SLIDER-01

### 5.1.2 Rule Description

A slider's maximum value must be strictly greater than its minimum value.

### 5.1.3 Enforcement Point

Client-side (in the wizard UI) and Backend (API validation on save).

### 5.1.4 Violation Handling

Display a user-friendly validation error message and block the save operation.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-SLIDER-02

### 5.2.2 Rule Description

A slider's step value must be a positive, non-zero number.

### 5.2.3 Enforcement Point

Client-side (in the wizard UI) and Backend (API validation on save).

### 5.2.4 Violation Handling

Display a user-friendly validation error message and block the save operation.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

The custom mode creation wizard must exist to add this feature to it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-042

#### 6.1.2.2 Dependency Reason

The mechanism for defining input variables is the foundation upon which this customization is built.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-047

#### 6.1.3.2 Dependency Reason

The framework for launching and rendering a custom mode must be in place to display the chosen UI control.

## 6.2.0.0 Technical Dependencies

- The frontend component library (Material-UI) must provide accessible slider and text field components.
- The backend data model for `custom_modes` must use a flexible format like JSONB to store the UI configuration.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The dynamic UI changes in the wizard (showing/hiding slider config) must complete in under 50ms.

## 7.2.0.0 Security

- All configuration data submitted to the backend must be validated to prevent injection or storage of malicious content.

## 7.3.0.0 Usability

- The process of selecting and configuring a control type should be intuitive and integrated seamlessly into the existing wizard flow.

## 7.4.0.0 Accessibility

- All new UI elements must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- The rendered slider component must function correctly on all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Frontend: Requires implementing a dynamic form with conditional logic in the React wizard.
- Frontend: Requires a dynamic rendering component that can render different input types based on the custom mode's definition.
- Backend: Requires adding validation logic to the existing create/update endpoint for custom modes.
- Data Model: The JSON schema for the `definition` field in the `custom_modes` table must be formally defined and versioned to support this and future UI controls.

## 8.3.0.0 Technical Risks

- Ensuring the slider component is fully accessible and provides a good user experience on both desktop (mouse/keyboard) and mobile (touch) can be challenging.

## 8.4.0.0 Integration Points

- Frontend: Custom Mode Wizard component, Custom Mode Renderer component.
- Backend: API endpoint for creating/updating custom modes (`POST /api/v1/modes`, `PUT /api/v1/modes/:id`).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Full E2E scenario: Log in, create a new custom mode, define one text input and one slider input, save, launch, and verify both controls work correctly in a calculation.
- Test slider configuration validation on both client and server.
- Test editing a mode to change a control type from slider to text field and vice-versa.
- Test importing a JSON file that contains slider configuration.

## 9.3.0.0 Test Data Needs

- User account for creating modes.
- Sample valid and invalid slider configurations (e.g., min > max, step = 0).

## 9.4.0.0 Testing Tools

- Jest & React Testing Library (Frontend Unit/Component)
- Jest & Supertest (Backend API Integration)
- Cypress (E2E)
- Axe (Accessibility)

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit and integration tests implemented with >85% coverage for new logic
- E2E tests for the primary success and error scenarios are implemented and passing
- User interface reviewed for usability and consistency by a designer or product owner
- Accessibility of new UI components verified via automated tools and manual keyboard/screen reader testing
- The JSON schema for the custom mode definition is documented
- In-app help documentation (REQ-FRC-001) is updated to explain how to use different UI controls
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be scheduled in a sprint after its prerequisite stories (US-041, US-042, US-047) are completed and verified.
- Requires both frontend and backend development effort, which should be coordinated.

## 11.4.0.0 Release Impact

- This is a significant enhancement to the custom mode feature. Its release should be highlighted in user-facing communications.

