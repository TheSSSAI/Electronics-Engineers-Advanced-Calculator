# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-015 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Configure the display format for results |
| As A User Story | As an electronics engineer, I want to configure th... |
| User Persona | Engineer, electronics hobbyist, scientist, or tech... |
| Business Value | Enhances the calculator's utility for its target p... |
| Functional Area | Core Calculator & User Settings |
| Story Theme | User Customization & Experience |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-01

### 3.1.2 Scenario

Access and view display format settings

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

A user is viewing the main calculator interface

### 3.1.5 When

the user clicks on the 'Settings' icon or menu item

### 3.1.6 Then

a settings panel or modal is displayed, containing controls for 'Engineering Notation', 'Significant Figures', and 'Default Unit'.

### 3.1.7 Validation Notes

Verify the settings UI element is present and opens the correct panel. The panel must be accessible via keyboard.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-02

### 3.2.2 Scenario

Enable Engineering Notation and see result format change

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the calculator shows a result of '12345'

### 3.2.5 When

the user opens the display settings and enables the 'Engineering Notation' toggle

### 3.2.6 Then

the result on the main calculator display immediately updates to '12.345 k'.

### 3.2.7 Validation Notes

Test with various numbers to ensure correct SI prefix conversion (e.g., 1234567 -> 1.234567 M, 0.00123 -> 1.23 m, 0.00000123 -> 1.23 μ). The exponent must be a multiple of 3.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-03

### 3.3.2 Scenario

Set the number of significant figures

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the calculator shows a result of '3.14159265'

### 3.3.5 When

the user opens the display settings and sets 'Significant Figures' to 4

### 3.3.6 Then

the result on the main calculator display updates to '3.142'.

### 3.3.7 Validation Notes

Verify that standard rounding rules (round half up) are applied correctly. Test with integers and decimals.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-04

### 3.4.2 Scenario

Set a default unit for results

### 3.4.3 Scenario Type

Happy_Path

### 3.4.4 Given

the calculator shows a result of '4700'

### 3.4.5 When

the user opens the display settings, enables 'Engineering Notation', and sets the 'Default Unit' to 'Ω'

### 3.4.6 Then

the result on the main calculator display updates to '4.7 kΩ'.

### 3.4.7 Validation Notes

Verify the unit is appended to the formatted number with a space. If no unit is set, no unit should be displayed.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-05

### 3.5.2 Scenario

Settings persistence for a logged-in user

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

a logged-in user has configured the display format to use Engineering Notation and 3 significant figures

### 3.5.5 When

the user logs out and logs back in at a later time or on a different device

### 3.5.6 Then

the display format settings are restored, and any new calculation result is formatted accordingly.

### 3.5.7 Validation Notes

Verify that a GET request for user preferences is made upon login and the settings are applied to the application's state.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-06

### 3.6.2 Scenario

Settings persistence for an anonymous user

### 3.6.3 Scenario Type

Alternative_Flow

### 3.6.4 Given

a user who is not logged in configures the display format

### 3.6.5 When

the user refreshes the page or closes and reopens the browser

### 3.6.6 Then

the display format settings are retained.

### 3.6.7 Validation Notes

Verify that settings are saved to the browser's `localStorage` or `IndexedDB` and loaded on application startup for anonymous sessions.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-07

### 3.7.2 Scenario

Logged-in user settings override anonymous settings

### 3.7.3 Scenario Type

Alternative_Flow

### 3.7.4 Given

an anonymous user has set significant figures to 2

### 3.7.5 And

they log in to an account where the saved preference for significant figures is 5

### 3.7.6 When

the login process completes successfully

### 3.7.7 Then

the application's display format settings are updated to use 5 significant figures, overriding the locally stored anonymous setting.

### 3.7.8 Validation Notes

Check application state to ensure server-side preferences take precedence over local ones post-authentication.

## 3.8.0 Criteria Id

### 3.8.1 Criteria Id

AC-08

### 3.8.2 Scenario

Attempt to set an invalid number of significant figures

### 3.8.3 Scenario Type

Error_Condition

### 3.8.4 Given

the user is in the display settings panel

### 3.8.5 When

the user attempts to enter '0', a negative number, or a non-integer for 'Significant Figures'

### 3.8.6 Then

the input is either rejected or a validation error message is displayed, and the setting is not applied.

### 3.8.7 Validation Notes

The UI should enforce a valid range, for example, 1 to 16.

## 3.9.0 Criteria Id

### 3.9.1 Criteria Id

AC-09

### 3.9.2 Scenario

Formatting of zero

### 3.9.3 Scenario Type

Edge_Case

### 3.9.4 Given

any display format settings are configured

### 3.9.5 When

a calculation result is '0'

### 3.9.6 Then

the display shows exactly '0', without any SI prefix or unit.

### 3.9.7 Validation Notes

Test with and without a default unit configured. The output should always be '0'.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A persistent 'Settings' icon (e.g., a gear) in the main UI.
- A settings modal or panel.
- A toggle switch for 'Engineering Notation'.
- A number input field (with stepper controls) for 'Significant Figures'.
- A text input field for 'Default Unit'.
- A 'Save' or 'Close' button for the settings panel.

## 4.2.0 User Interactions

- Clicking the settings icon opens the settings panel.
- Changes to settings should ideally reflect in a preview or on the main display in real-time.
- The settings panel can be closed by clicking a 'Close' button or clicking outside the modal.
- Input validation messages appear if invalid data is entered.

## 4.3.0 Display Requirements

- The main calculator result display must update to reflect the current formatting settings.
- The settings panel must clearly show the current values for each configuration option.

## 4.4.0 Accessibility Needs

- The settings panel and all its controls must be fully keyboard navigable (Tab, Shift+Tab, Enter, Space).
- All controls must have appropriate labels (`<label for=...>`, `aria-label`) for screen readers.
- The panel must be a proper modal, trapping focus until it is closed.
- Adherence to WCAG 2.1 Level AA standards is required.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-001

### 5.1.2 Rule Description

The number of significant figures must be a positive integer between 1 and 16, inclusive.

### 5.1.3 Enforcement Point

Client-side UI and Backend API validation.

### 5.1.4 Violation Handling

Display a user-friendly validation message on the client. The backend API should reject the request with a 4xx status code and error details.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-002

### 5.2.2 Rule Description

User-specific display settings are associated with a registered user's account and must be loaded upon authentication.

### 5.2.3 Enforcement Point

Backend authentication and data retrieval logic.

### 5.2.4 Violation Handling

If settings cannot be loaded, the application should fall back to a default configuration without blocking the user.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Requires a core calculation engine to produce a result that can be formatted.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

Requires user login functionality to fetch and persist settings for registered users.

## 6.2.0.0 Technical Dependencies

- A global state management solution (e.g., Redux Toolkit) to hold and propagate settings throughout the application.
- A backend API endpoint (e.g., `PUT /api/v1/user/preferences`) to save settings.
- A backend API endpoint (e.g., `GET /api/v1/user/preferences`) to retrieve settings on login.
- Browser `localStorage` or `IndexedDB` API for anonymous user persistence.

## 6.3.0.0 Data Dependencies

- Requires a data model on the backend to store user preferences, likely a new table or a JSONB column on the `users` table.

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Applying number formatting to a result must complete in under 50ms as per REQ-NFP-001.
- API calls to save/load preferences must have a P95 response time of less than 200ms as per REQ-NFP-001.

## 7.2.0.0 Security

- API endpoints for managing user preferences must be authenticated and authorized, ensuring a user can only modify their own settings.
- Any user-provided string (e.g., 'Default Unit') must be properly sanitized before being rendered to prevent XSS vulnerabilities.

## 7.3.0.0 Usability

- The settings should be easy to discover and understand.
- The effect of changing a setting should be immediately visible to the user.

## 7.4.0.0 Accessibility

- Must comply with WCAG 2.1 Level AA standards as per REQ-UI-001.

## 7.5.0.0 Compatibility

- The feature must work consistently across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires both frontend (UI, state management, formatting logic) and backend (API, database schema) development.
- The number formatting logic needs to be robust to handle edge cases like zero, very large/small numbers, and correct rounding.
- Managing dual state persistence (local for anonymous, remote for authenticated) adds complexity.

## 8.3.0.0 Technical Risks

- Potential for floating-point inaccuracies in the formatting logic; requires careful implementation and thorough testing.
- Ensuring a smooth transition between anonymous and authenticated states without losing user-configured settings until the server-side ones are loaded.

## 8.4.0.0 Integration Points

- Frontend state management (Redux).
- Backend User Preferences API.
- Main Calculator Display component.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0.0 Test Scenarios

- Verify formatting for a comprehensive set of numbers (positive, negative, zero, integers, decimals, large/small values).
- Verify all combinations of settings (Eng. Notation ON/OFF, various Sig Figs, with/without Unit).
- Test the login/logout flow to ensure settings are loaded and cleared correctly.
- Test the anonymous user flow, including page reloads.
- Test keyboard navigation and screen reader compatibility for the settings panel.

## 9.3.0.0 Test Data Needs

- A matrix of input numbers and expected formatted outputs for each combination of settings.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for frontend unit/component tests.
- Supertest for backend API integration tests.
- Cypress for E2E tests.
- Axe for accessibility scanning.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing.
- Code reviewed and approved by team.
- Unit tests implemented for formatting logic and API endpoints, achieving >85% coverage.
- Integration testing between frontend and backend for settings persistence is completed successfully.
- E2E tests for the user configuration flow are implemented and passing.
- User interface reviewed and approved for usability and accessibility (WCAG 2.1 AA).
- Performance requirements are verified.
- Security requirements are validated (e.g., endpoint protection, input sanitization).
- Documentation for the User Preferences API endpoint is updated/generated.
- Story deployed and verified in the staging environment.

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is a key differentiator for the target audience. It should be prioritized after core authentication and calculation functionalities are stable.
- Requires coordinated effort between frontend and backend developers.

## 11.4.0.0 Release Impact

- Significantly improves the professional appeal of the calculator. This is a marketable feature for the v1.0 launch.

