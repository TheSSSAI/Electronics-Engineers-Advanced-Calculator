# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-018 |
| Elaboration Date | 2025-01-18 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Recall the value from memory (MR) |
| As A User Story | As a Calculator User performing a multi-step calcu... |
| User Persona | Any user of the scientific calculator, from studen... |
| Business Value | Improves calculation efficiency and accuracy by al... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Calculator Memory Functions |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Recall a stored value into an empty input field

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

the memory register contains a non-zero value (e.g., 42.5)

### 3.1.5 And

the value in the memory register remains '42.5'

### 3.1.6 When

the user clicks the 'MR' button

### 3.1.7 Then

the input field displays '42.5'

### 3.1.8 Validation Notes

Verify the input field's content and check the application's state to confirm the memory value is unchanged.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Recall a stored value to append to an existing expression

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the memory register contains a value (e.g., 10)

### 3.2.5 And

the value in the memory register remains '10'

### 3.2.6 When

the user clicks the 'MR' button

### 3.2.7 Then

the input field is updated to '5 * 10'

### 3.2.8 Validation Notes

Verify the concatenated string in the input field. The recalled value should be appended at the current cursor position.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Recall from an empty or cleared memory

### 3.3.3 Scenario Type

Edge_Case

### 3.3.4 Given

the memory register's value is 0 (either by default or after using 'MC')

### 3.3.5 When

the user clicks the 'MR' button

### 3.3.6 Then

the character '0' is inserted into the input field

### 3.3.7 And

the value in the memory register remains '0'

### 3.3.8 Validation Notes

Test this scenario after a fresh application load and after explicitly clicking the 'MC' button.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Recall the same value multiple times in one expression

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

the memory register contains a value (e.g., 7)

### 3.4.5 And

the value in the memory register remains '7'

### 3.4.6 When

the user clicks 'MR', then the '+' operator, then 'MR' again

### 3.4.7 Then

the input field displays '7 + 7'

### 3.4.8 Validation Notes

Ensure that multiple recall actions within the same expression work correctly and do not alter the stored memory value.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Memory value persists for logged-in users

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a logged-in user has stored a value (e.g., 3.14) in memory

### 3.5.5 And

the user ends their session and logs back in later

### 3.5.6 When

the user clicks the 'MR' button

### 3.5.7 Then

the value '3.14' is inserted into the input field

### 3.5.8 Validation Notes

This tests the persistence requirement from REQ-FRC-001. Requires coordination with the user state persistence feature.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A dedicated 'MR' (Memory Recall) button, visually grouped with other memory function buttons (M+, M-, MC).
- A subtle, non-intrusive UI indicator (e.g., a small 'M' symbol near the display) that is visible only when the memory register contains a non-zero value.

## 4.2.0 User Interactions

- Clicking the 'MR' button inserts the memory value into the current input expression at the cursor's position.
- The button must provide immediate visual feedback upon being pressed, as per REQ-UI-001.
- The button must be fully operable via keyboard (tab to focus, Enter/Space to activate).

## 4.3.0 Display Requirements

- The recalled number should be formatted consistently with other numbers entered into the input field.

## 4.4.0 Accessibility Needs

- The 'MR' button must have an appropriate ARIA label, such as 'Memory Recall', for screen reader users, in compliance with WCAG 2.1 standards (REQ-UI-001).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

Recalling memory (MR) is a non-destructive read operation. It must not alter or clear the value stored in the memory register.

### 5.1.3 Enforcement Point

Client-side application logic (State Management).

### 5.1.4 Violation Handling

N/A. This is a core logic requirement.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

If no value has been explicitly stored in memory, the default value is 0.

### 5.2.3 Enforcement Point

Client-side application logic (State Management initial state).

### 5.2.4 Violation Handling

N/A. This defines the default behavior.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-016

#### 6.1.1.2 Dependency Reason

The 'M+' story is required to add a value to memory, which is necessary to test the recall functionality.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-017

#### 6.1.2.2 Dependency Reason

The 'M-' story is required to modify the value in memory, providing test cases for MR.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-019

#### 6.1.3.2 Dependency Reason

The 'MC' story is required to clear the memory, which is necessary to test the 'recall from empty' edge case (AC-003).

### 6.1.4.0 Story Id

#### 6.1.4.1 Story Id

US-053

#### 6.1.4.2 Dependency Reason

The 'Log in' story is required to test the persistence of the memory value across sessions for registered users (AC-005).

## 6.2.0.0 Technical Dependencies

- The application's client-side state management solution (e.g., Redux Toolkit as per REQ-ARC-001) must be implemented to manage the memory register's state.
- For logged-in users, this feature depends on the backend API endpoint for fetching and persisting user-specific data, including memory values (REQ-FRU-001).

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The UI update after clicking 'MR' must complete in under 50ms, as per REQ-NFP-001.

## 7.2.0.0 Security

- N/A for this specific feature, as it is a client-side state manipulation. Persistence security is covered by REQ-NFS-001.

## 7.3.0.0 Usability

- The function should be intuitive and behave as users would expect from a standard physical or digital calculator.

## 7.4.0.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards, particularly for keyboard navigation and screen reader support for the 'MR' button (REQ-UI-001).

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Low

## 8.2.0.0 Complexity Factors

- This is a standard state management task.
- Logic is confined to the client-side for the action itself.
- Integration with the persistence layer for logged-in users is the only minor complexity.

## 8.3.0.0 Technical Risks

- Potential for race conditions if user state is being fetched from the backend while the user interacts with memory functions. The local state should be the source of truth for the UI, with background sync handling persistence.

## 8.4.0.0 Integration Points

- Client-side state management store (Redux Toolkit).
- Calculator input/display component.
- Backend user data persistence API (for saving/loading the memory value across sessions).

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify recall into an empty input.
- Verify recall appending to an operator.
- Verify recall after memory has been cleared with MC.
- Verify that M+, MR, M-, MR, MC, MR sequence works as expected.
- For logged-in users, verify memory value persists after a page refresh and after logging out and back in.

## 9.3.0.0 Test Data Needs

- Positive numbers, negative numbers, decimals, and zero as memory values.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing in a testing environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests are written for the state management logic and component, achieving >85% coverage for the new code.
- Integration tests covering the interaction between M+, M-, MC, and MR are implemented and passing.
- The 'MR' button and memory indicator UI elements are reviewed and approved by the design/UX team.
- Accessibility checks (keyboard navigation, ARIA labels) have been manually verified and passed.
- The feature is deployed and verified in the staging environment.
- Any related documentation (e.g., in-app help system) has been updated.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

1

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story should be scheduled in the same sprint as, or immediately following, the other memory function stories (US-016, US-017, US-019) to deliver a complete feature set.

## 11.4.0.0 Release Impact

- Completes the set of standard memory functions, which is a key feature for the core calculator.

