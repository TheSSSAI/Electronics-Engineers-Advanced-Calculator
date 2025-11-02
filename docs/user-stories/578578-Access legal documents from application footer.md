# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-070 |
| Elaboration Date | 2025-01-26 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Access legal documents from application footer |
| As A User Story | As an application user (guest or registered), I wa... |
| User Persona | Any application user, including prospective users ... |
| Business Value | Fulfills legal and compliance requirements (REQ-LG... |
| Functional Area | User Interface & Experience |
| Story Theme | Legal and Compliance |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Footer with legal links is visible on all pages

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

a user is viewing any primary page of the application (e.g., main calculator, login screen, custom mode manager)

### 3.1.5 When

the user looks at the bottom of the page content

### 3.1.6 Then

a footer element is visible containing links for 'Terms of Service' and 'Privacy Policy'.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Clicking 'Terms of Service' link opens the document

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

the application footer is visible

### 3.2.5 When

the user clicks the 'Terms of Service' link

### 3.2.6 Then

a new browser tab opens displaying the current Terms of Service document.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Clicking 'Privacy Policy' link opens the document

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

the application footer is visible

### 3.3.5 When

the user clicks the 'Privacy Policy' link

### 3.3.6 Then

a new browser tab opens displaying the current Privacy Policy document.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Legal links are accessible via keyboard navigation

### 3.4.3 Scenario Type

Alternative_Flow

### 3.4.4 Given

a user is on any primary page of the application

### 3.4.5 When

the user presses the 'Tab' key to navigate through focusable elements on the page

### 3.4.6 Then

the focus eventually lands on the 'Terms of Service' link and then the 'Privacy Policy' link, and pressing 'Enter' on a focused link opens it in a new tab.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Footer links are responsive and usable on mobile devices

### 3.5.3 Scenario Type

Happy_Path

### 3.5.4 Given

the user is viewing the application on a device with a screen width of 375px

### 3.5.5 When

the user scrolls to the bottom of the page

### 3.5.6 Then

the footer and its links are legible and tappable with adequate spacing, without requiring the user to zoom in.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Links to external documents use secure attributes

### 3.6.3 Scenario Type

Happy_Path

### 3.6.4 Given

the links for legal documents are configured to open in a new tab

### 3.6.5 When

the HTML for the links is rendered

### 3.6.6 Then

the anchor tags (`<a>`) must include the `rel="noopener noreferrer"` attribute to enhance security.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- A global footer component.
- A hyperlink element with the text 'Terms of Service'.
- A hyperlink element with the text 'Privacy Policy'.

## 4.2.0 User Interactions

- Standard hyperlink behavior on click/tap.
- Links must have distinct hover and focus states for visual feedback.
- Links must open in a new browser tab (`target="_blank"`).

## 4.3.0 Display Requirements

- The footer must be consistently positioned at the bottom of the application's layout.
- The footer should be visually distinct from the main content area, adhering to the application's style guide (REQ-UI-001).

## 4.4.0 Accessibility Needs

- Links must have sufficient color contrast against the footer background to meet WCAG 2.1 AA standards (REQ-UI-001).
- Links must be included in the page's natural tab order for keyboard navigation.
- The link text itself is descriptive, so no additional `aria-label` is required.

# 5.0.0 Business Rules

- {'rule_id': 'BR-001', 'rule_description': 'The URLs for the legal documents must be configurable and not hardcoded in the source code to allow for easy updates without requiring a new deployment.', 'enforcement_point': 'Implementation (e.g., use of environment variables).', 'violation_handling': 'Code review will fail if URLs are hardcoded.'}

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

*No items available*

## 6.2.0 Technical Dependencies

- A global application layout component must exist where the footer can be placed to ensure its persistence across all views.
- The application's routing mechanism must be established.

## 6.3.0 Data Dependencies

- The final, legally-approved URLs for the Terms of Service and Privacy Policy documents. Placeholder URLs can be used during development.

## 6.4.0 External Dependencies

- Legal counsel must provide and approve the content and final URLs for both documents. This is a critical path dependency for the story to be considered fully complete for production release.

# 7.0.0 Non Functional Requirements

## 7.1.0 Performance

- The footer component must be lightweight and not contribute significantly to the Largest Contentful Paint (LCP) or other core web vitals.

## 7.2.0 Security

- As per AC-006, links opening in a new tab must use `rel="noopener noreferrer"` to prevent tabnabbing vulnerabilities.

## 7.3.0 Usability

- The location of the links in the footer follows a standard, predictable design pattern, making them easy for users to find.

## 7.4.0 Accessibility

- Must adhere to WCAG 2.1 Level AA standards as defined in REQ-UI-001.

## 7.5.0 Compatibility

- The footer must render correctly on all supported browsers specified in REQ-ENV-001 (latest Chrome, Firefox, Safari, Edge).

# 8.0.0 Implementation Considerations

## 8.1.0 Complexity Assessment

Low

## 8.2.0 Complexity Factors

- Creation of a simple, static UI component.
- Integration into an existing application layout.
- Styling for responsiveness.

## 8.3.0 Technical Risks

- The primary risk is not technical but procedural: a delay in receiving the final, approved URLs from legal counsel could block the final validation of this story for production.

## 8.4.0 Integration Points

- The main application layout/shell component.

# 9.0.0 Testing Requirements

## 9.1.0 Testing Types

- Unit
- Integration
- E2E
- Accessibility

## 9.2.0 Test Scenarios

- Verify footer presence on key application routes (e.g., `/`, `/login`, `/settings`).
- Verify clicking each link opens a new tab with the correct URL.
- Verify keyboard navigation to and activation of the links.
- Verify layout and tappability on various screen sizes (desktop, tablet, mobile).
- Run automated accessibility checks (e.g., using Axe) on a page containing the footer.

## 9.3.0 Test Data Needs

- Placeholder URLs for development and automated testing environments.
- Final production URLs for staging and production verification.

## 9.4.0 Testing Tools

- Jest/React Testing Library for unit tests.
- Cypress for E2E tests.
- Axe-core for automated accessibility testing.

# 10.0.0 Definition Of Done

- All acceptance criteria validated and passing in a staging environment.
- Code has been peer-reviewed and merged into the main branch.
- Unit tests for the footer component are written and achieve required coverage.
- E2E tests verifying footer visibility and link functionality are implemented and passing.
- UI is fully responsive and matches design specifications.
- Accessibility checks (automated and manual) are completed and passing.
- The final, legally-approved URLs are configured in the production environment variables.
- The Product Owner has reviewed and accepted the implementation.

# 11.0.0 Planning Information

## 11.1.0 Story Points

1

## 11.2.0 Priority

🔴 High

## 11.3.0 Sprint Considerations

- This is a foundational UI element and a legal requirement, so it should be prioritized for an early sprint.
- Development can proceed with placeholder links, but the Product Owner must track the external dependency on legal counsel for the final URLs.

## 11.4.0 Release Impact

This story is mandatory for the v1.0 public release to meet legal compliance requirements.

