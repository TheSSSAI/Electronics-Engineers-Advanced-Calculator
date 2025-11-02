# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-017 |
| Elaboration Date | 2025-01-17 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Subtract a value from memory (M-) |
| As A User Story | As a Calculator User, I want to subtract the curre... |
| User Persona | Any user of the calculator (e.g., student, enginee... |
| Business Value | Enhances the calculator's utility by providing a s... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Memory Functions |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Subtract a positive value from an existing positive value in memory

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the memory register contains the value 100, and the calculator's result display shows 25

### 3.1.5 When

the user clicks the 'M-' button

### 3.1.6 Then

the value in the memory register is updated to 75

### 3.1.7 And

the 'M' memory indicator remains visible in the UI

### 3.1.8 Validation Notes

Verify by subsequently clicking the 'MR' button; the display should show 75.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Subtract a value when the memory register is empty (or zero)

### 3.2.3 Scenario Type

Edge_Case

### 3.2.4 Given

the memory register is empty (holds a value of 0), and the calculator's result display shows 50

### 3.2.5 When

the user clicks the 'M-' button

### 3.2.6 Then

the value in the memory register is updated to -50

### 3.2.7 And

the 'M' memory indicator becomes visible in the UI

### 3.2.8 Validation Notes

Verify by clicking 'MR'; the display should show -50. This assumes the 'MC' function was used previously to clear memory.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Subtract a negative value from memory (effectively performing an addition)

### 3.3.3 Scenario Type

Alternative_Flow

### 3.3.4 Given

the memory register contains the value 20, and the calculator's result display shows -10

### 3.3.5 When

the user clicks the 'M-' button

### 3.3.6 Then

the value in the memory register is updated to 30

### 3.3.7 Validation Notes

The calculation is 20 - (-10) = 30. Verify by clicking 'MR'; the display should show 30.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to use M- when the display shows an error

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

the memory register contains the value 100, and the calculator's result display shows an error message (e.g., 'Error')

### 3.4.5 When

the user clicks the 'M-' button

### 3.4.6 Then

the value in the memory register remains unchanged at 100

### 3.4.7 And

the 'M-' button should be visually disabled to prevent the action

### 3.4.8 Validation Notes

Perform an invalid operation like 1/0. Verify the 'M-' button becomes disabled. Click 'MR' to confirm the memory value has not changed.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Memory value persists across sessions for a logged-in user

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a logged-in user has a value of 90 in the memory register

### 3.5.5 When

the user logs out, closes the browser, re-opens the application, and logs back in

### 3.5.6 Then

the memory register still contains the value 90

### 3.5.7 And

the 'M' memory indicator is visible upon login

### 3.5.8 Validation Notes

This requires checking the user's state loaded from the backend API upon authentication.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A clearly labeled 'M-' button within the main calculator keypad area.
- A persistent 'M' indicator in the display area, visible whenever the memory register holds a non-zero value.

## 4.2.0 User Interactions

- Clicking the 'M-' button subtracts the current display value from the memory register.
- The 'M-' button should provide visual feedback on press, consistent with other buttons (REQ-UI-001).
- The 'M-' button should be visually disabled and non-interactive when the calculator display shows an error state.

## 4.3.0 Display Requirements

- The main calculator display value must not change after the M- operation is performed.
- The 'M' indicator must appear or remain visible after a successful M- operation that results in a non-zero memory value.

## 4.4.0 Accessibility Needs

- The 'M-' button must be fully keyboard-navigable (focusable and activatable via Enter/Space keys).
- The button must have an appropriate ARIA label, such as 'Memory Subtract', for screen readers (WCAG 2.1 AA compliance per REQ-UI-001).

# 5.0.0 Business Rules

- {'rule_id': 'BR-M-001', 'rule_description': 'The M- operation can only be performed on a valid numerical value. It cannot be performed on an error state.', 'enforcement_point': 'Client-side UI (button disabled) and potentially backend API (rejecting non-numeric updates).', 'violation_handling': 'The UI button is disabled, preventing the user from triggering the action. If an invalid API call is made, the backend should return a 4xx error.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-016

#### 6.1.1.2 Dependency Reason

The core memory register state and the M+ function must exist to have a value to subtract from.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-018

#### 6.1.2.2 Dependency Reason

The Memory Recall (MR) function is required to verify the result of the M- operation.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-019

#### 6.1.3.2 Dependency Reason

The Memory Clear (MC) function is required to reset the memory state for testing and user control.

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-055

#### 6.1.4.2 Dependency Reason

The core functionality for persisting user-defined variables (of which memory is a special case) across sessions for logged-in users must be implemented first.

## 6.2.0.0 Technical Dependencies

- Frontend state management system (Redux Toolkit per REQ-ARC-001) for managing the memory value.
- Backend API endpoint for persisting user state, including the memory value (REQ-API-001).
- Database schema in PostgreSQL to store the memory value, likely within the `user_variables` table (REQ-DAT-001).

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The client-side subtraction and UI update must complete in under 50ms as per REQ-NFP-001.
- For logged-in users, the background API call to persist the new memory value must have a P95 response time of less than 200ms.

## 7.2.0.0 Security

- API calls to update the memory value must be authenticated and authorized, ensuring a user can only modify their own memory register (REQ-NFS-001).

## 7.3.0.0 Usability

- The function should behave predictably and consistently with standard calculators.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- Simple arithmetic logic.
- Depends on existing state management and persistence infrastructure.
- No complex UI changes required.

## 8.3.0.0 Technical Risks

- Potential race conditions if multiple memory operations are triggered in rapid succession before API calls complete. An optimistic UI update strategy should be used.

## 8.4.0.0 Integration Points

- Integrates with the frontend state management store.
- Integrates with the backend user state persistence API.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify subtraction from a positive memory value.
- Verify subtraction from a zero/empty memory value.
- Verify subtraction of a negative value.
- Verify the button is disabled on display error.
- Verify the memory value persists after a page refresh for an anonymous user (local storage).
- Verify the memory value persists after logging out and back in for a registered user.

## 9.3.0.0 Test Data Needs

- Test user accounts with and without pre-existing memory values.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Supertest for backend API integration tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria are validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests for frontend logic and backend services achieve minimum 85% coverage.
- Integration tests for the API endpoint are implemented and passing.
- End-to-end tests simulating the user flow are created and passing.
- UI element is confirmed to be responsive and meets accessibility standards (WCAG 2.1 AA).
- Performance metrics are verified against NFRs.
- Any related documentation (e.g., in-app help) has been updated.
- Story has been successfully deployed and verified in the production environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is part of the 'Memory Functions' epic and should be scheduled alongside US-016, US-018, and US-019 to deliver a complete feature set.
- Requires the user persistence framework (US-055) to be completed first.

## 11.4.0.0 Release Impact

This is a core feature for the initial (v1.0) release.

