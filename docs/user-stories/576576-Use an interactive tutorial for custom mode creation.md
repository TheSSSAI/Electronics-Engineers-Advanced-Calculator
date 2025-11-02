# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-068 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Use an interactive tutorial for custom mode creati... |
| As A User Story | As a registered user new to creating custom modes,... |
| User Persona | A registered user who has created an account but h... |
| Business Value | Increases adoption and successful use of the custo... |
| Functional Area | User Onboarding & Training |
| Story Theme | User-Extensible Functionality |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

First-time user is prompted to start the tutorial

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A registered user is logged in and their profile indicates they have never completed or skipped the custom mode tutorial

### 3.1.5 When

The user navigates to the Custom Mode Creation wizard for the first time

### 3.1.6 Then

A modal or overlay is displayed, offering a brief explanation of the tutorial and providing options to 'Start Tutorial' and 'No, thanks'.

### 3.1.7 Validation Notes

Verify that the `custom_mode_tutorial_completed` flag (or equivalent) is checked on the user's profile before showing the prompt. The prompt should not appear on subsequent visits if the user makes a choice.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

User accepts and starts the tutorial

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user is presented with the tutorial prompt

### 3.2.5 When

The user clicks the 'Start Tutorial' button

### 3.2.6 Then

The prompt modal closes, and the first step of the interactive tutorial begins, highlighting the first element of the wizard (e.g., the 'Mode Name' input field).

### 3.2.7 Validation Notes

The tutorial should be implemented using a library like 'react-joyride' or similar to handle the overlays and step progression.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

User progresses through the tutorial steps

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The user is actively engaged in the interactive tutorial

### 3.3.5 When

The user clicks the 'Next' button on a tutorial step's popover

### 3.3.6 Then

The tutorial advances to the next logical step, highlighting the next relevant UI element and displaying the corresponding instructional text.

### 3.3.7 Validation Notes

The tutorial should guide the user through a simple, pre-defined example, such as creating an 'Area of a Circle' calculator. This includes naming the mode, defining an input ('radius'), defining an output ('area'), and writing the formula ('pi * radius^2').

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

User completes the tutorial

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The user is on the final step of the interactive tutorial

### 3.4.5 When

The user clicks the 'Finish' button

### 3.4.6 Then

The tutorial overlay is dismissed, a success message is briefly shown, and an API call is made to update the user's profile to mark the tutorial as completed.

### 3.4.7 Validation Notes

Verify via network tools that the API call is successful. Verify that on subsequent visits to the wizard, the initial prompt (AC-001) does not appear.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

User declines the initial tutorial prompt

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The user is presented with the tutorial prompt for the first time

### 3.5.5 When

The user clicks the 'No, thanks' button

### 3.5.6 Then

The prompt modal is dismissed, and the user can interact with the standard wizard. An API call is made to update the user's profile to prevent future automatic prompts.

### 3.5.7 Validation Notes

Verify the user's choice is persisted. The user should still be able to launch the tutorial manually (see AC-007).

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

User exits the tutorial midway

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

The user is actively engaged in the interactive tutorial

### 3.6.5 When

The user clicks the 'Skip Tutorial' or 'Exit' button (e.g., an 'X' icon) on the tutorial popover

### 3.6.6 Then

The tutorial overlay is immediately dismissed, and the user is returned to the standard wizard interface. The user's tutorial completion status is not updated.

### 3.6.7 Validation Notes

If the user re-enters the wizard in the same session, they should not be prompted again. If they log out and log back in, the initial prompt should reappear since they did not complete or explicitly decline it.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

User manually re-launches the tutorial

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

A user has previously completed, skipped, or declined the tutorial

### 3.7.5 When

The user clicks a dedicated 'Show Tutorial' icon or link within the Custom Mode wizard UI

### 3.7.6 Then

The interactive tutorial starts from the beginning (Step 1).

### 3.7.7 Validation Notes

Ensure there is a clear and persistent UI element, like a question mark icon, that allows any user to start the tutorial on demand.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Initial prompt modal with 'Start Tutorial' and 'No, thanks' buttons.
- Tutorial step popovers/tooltips with instructional text, a 'Next' button, and a 'Finish' button on the last step.
- A persistent 'Skip' or 'Exit' control on each tutorial step.
- A persistent icon (e.g., '?' or 'Help') within the Custom Mode wizard to manually launch the tutorial.

## 4.2.0 User Interactions

- The tutorial should highlight or focus on specific UI elements (inputs, buttons) for each step.
- Clicking 'Next' moves the highlight and popover to the next element in the sequence.
- The tutorial overlay should block interaction with non-highlighted elements to keep the user focused.

## 4.3.0 Display Requirements

- Instructional text must be clear, concise, and easy to understand.
- The highlighted area and popover must be visually distinct from the rest of the UI.

## 4.4.0 Accessibility Needs

- The tutorial must be fully navigable using a keyboard (e.g., 'Enter' to advance, 'Esc' to exit).
- All tutorial text must be readable by screen readers, and highlighted elements should be announced.
- Color contrast of tutorial elements must meet WCAG 2.1 AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The tutorial prompt should only be shown automatically to a user once.

### 5.1.3 Enforcement Point

Client-side logic upon loading the Custom Mode wizard.

### 5.1.4 Violation Handling

If the user's choice (accept, decline) is not persisted, they will be incorrectly prompted on every visit, leading to a poor user experience.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Completing or declining the tutorial must permanently update a flag in the user's backend profile.

### 5.2.3 Enforcement Point

Backend API endpoint for updating user preferences.

### 5.2.4 Violation Handling

Failure to persist this state means the user will be treated as 'new' on every login, breaking the logic of BR-001.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-041

#### 6.1.1.2 Dependency Reason

The Custom Mode Creation wizard must exist before a tutorial can be built for it.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-042

#### 6.1.2.2 Dependency Reason

The UI for defining input and output variables must be implemented as the tutorial will guide the user through it.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-043

#### 6.1.3.2 Dependency Reason

The UI for writing formulas must be implemented as the tutorial will guide the user through it.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-056

#### 6.1.4.2 Dependency Reason

The user account system must support storing user-specific flags, such as tutorial completion status.

## 6.2.0.0 Technical Dependencies

- A front-end library for creating guided tours (e.g., 'react-joyride', 'intro.js', or similar).
- A backend API endpoint to get and set the user's tutorial completion status.

## 6.3.0.0 Data Dependencies

- Requires a new boolean field in the `users` table or a related `user_preferences` table (e.g., `custom_mode_tutorial_completed`).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Loading the tutorial library should not significantly impact the initial load time of the Custom Mode wizard.
- Tutorial animations and transitions should be smooth (60fps) and not cause UI jank.

## 7.2.0.0 Security

- The API endpoint for updating tutorial status must be authenticated and authorized, ensuring users can only update their own status.

## 7.3.0.0 Usability

- The tutorial must be intuitive and require minimal cognitive load. The instructions should be unambiguous.
- The user must always have a clear and easy way to exit the tutorial at any step.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- The tutorial must render and function correctly on all supported browsers (Chrome, Firefox, Safari, Edge) and on both desktop and mobile viewports.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires selecting, integrating, and configuring a third-party guided tour library.
- The tutorial component will be tightly coupled to the DOM structure of the wizard. Changes to the wizard's UI may require updates to the tutorial's step definitions (e.g., target selectors).
- Requires both frontend state management for the tutorial flow and a backend change to persist completion status.

## 8.3.0.0 Technical Risks

- The chosen tour library may have limitations or bugs that affect implementation.
- Maintaining synchronization between the tutorial steps and the wizard UI during future development could be challenging.

## 8.4.0.0 Integration Points

- Frontend: Custom Mode Creation wizard component.
- Backend: User profile/preferences API endpoint.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Component
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- A new user successfully completes the entire tutorial.
- A new user declines the tutorial prompt.
- A user starts the tutorial but exits midway.
- A returning user manually re-launches the tutorial.
- Verify the tutorial does not auto-launch for a user who has already completed it.
- Verify the tutorial is fully keyboard navigable.

## 9.3.0.0 Test Data Needs

- A test user account flagged as never having seen the tutorial.
- A test user account flagged as having completed the tutorial.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for E2E testing.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit and component tests implemented with >85% coverage for tutorial logic
- E2E tests for all key scenarios are implemented and passing
- User interface reviewed and approved for both desktop and mobile
- Accessibility (WCAG 2.1 AA) requirements validated
- Backend API for persisting user state is implemented, tested, and secured
- Documentation for maintaining the tutorial (e.g., updating steps) is created
- Story deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🟡 Medium

## 11.3.0.0 Sprint Considerations

- This story is dependent on the completion of the core Custom Mode wizard (US-041, US-042, US-043). It should be scheduled in a subsequent sprint.
- Time should be allocated for evaluating and selecting a suitable guided tour library.

## 11.4.0.0 Release Impact

This is a significant enhancement to user onboarding for a key feature. It is not a blocker for the initial release of the custom mode creator but is highly desirable for improving user adoption.

