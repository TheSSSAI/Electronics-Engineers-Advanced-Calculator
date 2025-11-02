# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-010 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Undo the last change to the input expression |
| As A User Story | As a Calculator User, I want to undo my last input... |
| User Persona | Any user of the calculator, from casual users to p... |
| Business Value | Improves user experience by providing a forgiving ... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Calculator Usability Enhancements |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Undo a single character input via UI button

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user has entered '123+4' into the input field

### 3.1.5 When

The user clicks the 'Undo' button

### 3.1.6 Then

The input field's value becomes '123+'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Undo a function input via keyboard shortcut

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user has entered '123*' and then clicked the 'sin(' button, making the input '123*sin('

### 3.2.5 When

The user presses the 'Ctrl+Z' keyboard shortcut ('Cmd+Z' on macOS)

### 3.2.6 Then

The input field's value reverts to '123*'.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Perform multiple consecutive undo actions

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The user has entered the expression '10k/2'

### 3.3.5 When

The user triggers the undo action three times

### 3.3.6 Then

The input field's value becomes '10'.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Undo a pasted text block

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

The input field is empty and the user pastes the text '3.14159'

### 3.4.5 When

The user triggers the undo action

### 3.4.6 Then

The input field becomes empty.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Attempt to undo with an empty history

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

The input field is empty and no actions have been taken, or the history has been cleared

### 3.5.5 When

The user triggers the undo action

### 3.5.6 Then

The input field remains empty and no error occurs.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

UI button is disabled when no undo is possible

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

The undo history is empty

### 3.6.5 When

The UI is rendered

### 3.6.6 Then

The 'Undo' button is visually disabled and not interactive.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-007

### 3.7.2 Scenario

UI button is enabled after an input action

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

The undo history is empty

### 3.7.5 When

The user types a character into the input field

### 3.7.6 Then

The 'Undo' button becomes enabled and interactive.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-008

### 3.8.2 Scenario

New input after undo clears the redo history

### 3.8.3 Scenario Type

Alternative_Flow

### 3.8.4 Given

The user has entered '123+45' and then triggered undo twice, making the input '123'

### 3.8.5 When

The user then types '*', making the input '123*'

### 3.8.6 Then

The redo history (containing '+' and '45') is cleared, and it is no longer possible to 'redo' those actions.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- An 'Undo' button, typically represented by a counter-clockwise arrow icon, must be present in the main calculator interface.

## 4.2.0 User Interactions

- The 'Undo' button is clickable to trigger the undo action.
- The standard keyboard shortcut 'Ctrl+Z' (and 'Cmd+Z' for macOS) must trigger the undo action.
- The 'Undo' button's visual state must change to disabled (e.g., greyed out) when there are no actions to undo.

## 4.3.0 Display Requirements

- The primary calculator display must update immediately to reflect the state of the expression after an undo action.

## 4.4.0 Accessibility Needs

- The 'Undo' button must be keyboard-navigable and focusable.
- The button must have an appropriate ARIA label, such as 'Undo last action'.
- The disabled state of the button must be programmatically determinable by screen readers (e.g., using `aria-disabled='true'`).

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The undo history stack must be cleared when a calculation is finalized (e.g., '=' is pressed) or when the user explicitly clears the entire input (e.g., 'C' or 'AC' button).

### 5.1.3 Enforcement Point

Client-side application logic upon calculation or clear events.

### 5.1.4 Violation Handling

Failure to clear the stack could lead to unexpected behavior where a user can undo back into a previously calculated expression.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

Any new input action following one or more undo actions must clear the redo history.

### 5.2.3 Enforcement Point

Client-side state management logic when a new input event is processed.

### 5.2.4 Violation Handling

If the redo history is not cleared, the user could 'redo' an action that is inconsistent with the new expression, corrupting the input state.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

- {'story_id': 'US-001', 'dependency_reason': 'Requires a basic input field and mechanism for entering numbers and operators to test the undo functionality.'}

## 6.2.0 Technical Dependencies

- A client-side state management solution (e.g., Redux Toolkit as per REQ-ARC-001) capable of managing an immutable history of the input state.

## 6.3.0 Data Dependencies

*No items available*

## 6.4.0 External Dependencies

*No items available*

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The undo action and corresponding UI update must complete in under 50ms, as per REQ-NFP-001.

## 7.2.0 Security

- No specific security requirements as this is a client-side only feature.

## 7.3.0 Usability

- The feature must behave predictably and consistently with standard undo functionality found in other modern applications.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards, as per REQ-UI-001.

## 7.5.0 Compatibility

- Must function correctly on the latest versions of Chrome, Firefox, Safari, and Edge, as per REQ-ENV-001.

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Requires implementing a history stack (undo/redo stack) within the client-side state management.
- Logic must correctly identify discrete user actions to push onto the stack (e.g., a button click, a paste event).
- The implementation should be forward-thinking to accommodate the 'Redo' feature (US-011) with minimal rework.

## 8.3.0 Technical Risks

- Potential for performance degradation if the history stack is managed inefficiently, though this is a low risk for calculator input strings.
- Incorrectly defining what constitutes a single 'action' could lead to a confusing user experience (e.g., undoing character-by-character vs. undoing a whole number).

## 8.4.0 Integration Points

- Integrates with the calculator's main input component.
- Integrates with the global state management store.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Component
- E2E

## 9.2.0 Test Scenarios

- Verify single and multiple undo actions via both UI button and keyboard shortcut.
- Verify the button's enabled/disabled state corresponds correctly to the history stack's state.
- Verify undoing with an empty stack does nothing.
- Verify that performing a new action after an undo correctly clears the potential redo stack.
- Verify undoing a paste action removes the entire pasted content.

## 9.3.0 Test Data Needs

- Simple arithmetic expressions.
- Expressions including functions and constants.
- Text blocks for paste testing.

## 9.4.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for end-to-end tests.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests for the state management logic are implemented and passing with >= 85% coverage
- End-to-end tests for the user interaction are implemented and passing
- The 'Undo' button and its states are fully accessible per WCAG 2.1 AA
- Performance of the undo action is confirmed to be under 50ms
- The implementation is confirmed to be compatible with the future 'Redo' story (US-011)
- Story deployed and verified in the staging environment

# 11.0.0 Planning Information

## 11.1.0 Story Points

2

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This story should be prioritized early in the development cycle as it is a fundamental usability feature.
- Should be developed in conjunction with or immediately after the core calculator input functionality.
- The implementation should be paired with US-011 (Redo) in the same or a subsequent sprint to ensure a cohesive implementation of the history stack.

## 11.4.0 Release Impact

This is a core feature expected by users in a modern calculator application. Its inclusion is important for the initial v1.0 release.

