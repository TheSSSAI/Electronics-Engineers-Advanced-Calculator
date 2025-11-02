# 1 Integration Specifications

## 1.1 Extraction Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-APP-FRONTEND |
| Extraction Timestamp | 2024-05-24T12:00:00Z |
| Mapping Validation Score | 100% |
| Context Completeness Score | 100% |
| Implementation Readiness Level | High |

## 1.2 Relevant Requirements

### 1.2.1 Requirement Id

#### 1.2.1.1 Requirement Id

REQ-1-005

#### 1.2.1.2 Requirement Text

The application shall be a responsive Single Page Application (SPA) that provides an optimal and consistent user experience across modern desktop and mobile web browsers, adapting its layout to various screen sizes.

#### 1.2.1.3 Validation Criteria

- Verify the application renders correctly and is fully usable on the latest versions of Chrome, Firefox, Safari, and Edge on desktop.
- Verify the application layout adapts and remains fully usable on screen widths corresponding to common mobile phones (e.g., 375px), tablets (e.g., 768px), and desktops (e.g., 1280px+).

#### 1.2.1.4 Implementation Implications

- A responsive design framework (e.g., mobile-first CSS, grid/flexbox layouts) must be established as the foundation of the application shell.
- The root application component must handle layout breakpoints to orchestrate the display of child components correctly on different screen sizes.

#### 1.2.1.5 Extraction Reasoning

This requirement directly defines the fundamental nature of the frontend-app repository, which is explicitly described as the 'primary Single Page Application (SPA) shell'.

### 1.2.2.0 Requirement Id

#### 1.2.2.1 Requirement Id

REQ-1-034

#### 1.2.2.2 Requirement Text

The application's user interface must be developed to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at the Level AA conformance level.

#### 1.2.2.3 Validation Criteria

- Run an automated accessibility audit (e.g., Axe, Lighthouse) and verify it reports no critical WCAG 2.1 AA violations.
- Verify that all interactive elements can be reached and activated using only the Tab and Enter/Space keys.
- Verify that form inputs have associated labels and that images have appropriate alt text.

#### 1.2.2.4 Implementation Implications

- The application shell must implement accessibility best practices for the overall page structure, including landmark regions, skip links, and focus management.
- All components integrated by the shell must adhere to these standards, making it a system-wide concern owned at this top level.

#### 1.2.2.5 Extraction Reasoning

This is a global non-functional requirement for the entire UI. The frontend-app repository, as the SPA shell, is the primary place where the overall structure supporting accessibility (like landmark regions and focus management) is implemented.

### 1.2.3.0 Requirement Id

#### 1.2.3.1 Requirement Id

REQ-1-004

#### 1.2.3.2 Requirement Text

The system shall implement a user account system that enables registration, login, and secure data persistence for user-specific data...

#### 1.2.3.3 Validation Criteria

- Verify that a new user can register for an account.
- Verify that a registered user can log in.
- Verify that upon login, the user's specific history, variables, and custom modes are loaded.

#### 1.2.3.4 Implementation Implications

- The application shell must manage global authentication state (e.g., user is logged in/out, user profile, JWT).
- It must implement protected routes that redirect unauthenticated users to a login page.
- It is responsible for orchestrating the initial fetch of user data upon successful login.

#### 1.2.3.5 Extraction Reasoning

The repository description explicitly states that it handles 'user session management', making this requirement directly relevant to its core responsibilities.

### 1.2.4.0 Requirement Id

#### 1.2.4.1 Requirement Id

REQ-1-014

#### 1.2.4.2 Requirement Text

The system must support offline data modifications by queuing changes locally in the browser's IndexedDB. When network connectivity is restored, the application shall automatically synchronize the queued local changes with the backend server.

#### 1.2.4.3 Validation Criteria

- While online, log in and perform an action (e.g., save a variable).
- Go offline and perform another action (e.g., add a calculation to history).
- Verify the offline change is stored in IndexedDB.
- Go back online and verify the application automatically sends the queued change to the server.

#### 1.2.4.4 Implementation Implications

- This repository must integrate and manage the lifecycle of the OfflineSyncManager service provided by the frontend-utils library.
- It must implement UI feedback for offline status and synchronization progress.
- The application's API client must be configured to intercept network failures and route them to the offline queue.

#### 1.2.4.5 Extraction Reasoning

This repository is the orchestrator of the entire user experience, including managing the application's response to changes in network connectivity and initiating the synchronization process.

### 1.2.5.0 Requirement Id

#### 1.2.5.1 Requirement Id

REQ-1-025

#### 1.2.5.2 Requirement Text

The application must include a comprehensive, searchable in-app help system. This system, accessible via a persistent global UI icon, will provide documentation for all features... The help content will be authored and presented using the Docusaurus framework.

#### 1.2.5.3 Validation Criteria

- Verify a help icon is always visible in the main application UI.
- Clicking the icon opens the help system (e.g., in a modal or new tab).
- Verify the help content is rendered from Docusaurus-generated artifacts.

#### 1.2.5.4 Implementation Implications

- This repository must implement the persistent help icon and the modal/view that will host the Docusaurus content.
- It must be configured with the URL of the deployed Docusaurus site to fetch and display its content.

#### 1.2.5.5 Extraction Reasoning

This repository is responsible for the overall application shell and user-facing controls, including the entry point and presentation of the in-app help system.

## 1.3.0.0 Relevant Components

- {'component_name': 'ApplicationShell', 'component_specification': 'The root React component of the SPA. It is responsible for setting up the main application layout, defining routes, managing global authentication state, and composing feature components imported from the ui-components-library. It serves as the primary orchestrator for the entire user experience.', 'implementation_requirements': ["Implement routing using 'react-router-dom' to map URLs to specific page layouts.", 'Integrate with Redux Toolkit to manage global state such as the current user, session status, and application-wide settings.', 'Render the main application layout, including a persistent header, navigation, and a main content area where routed components are displayed.', 'Handle the OAuth 2.0 PKCE flow for user authentication with AWS Cognito.', 'Initialize and manage the OfflineSyncManager from the frontend-utils library.'], 'architectural_context': "This is the primary component within the 'Presentation Layer' and is the entry point for the frontend-app repository.", 'extraction_reasoning': 'This component is the main deliverable of the frontend-app repository itself, encapsulating its core responsibilities of orchestration and structure.'}

## 1.4.0.0 Architectural Layers

- {'layer_name': 'Client SPA (Presentation)', 'layer_responsibilities': "Responsible for rendering the entire user interface, managing all client-side state (UI state, cached data), handling user interactions, and communicating with the backend via the API Gateway. This repository implements the shell of this layer, orchestrating components that fulfill the layer's responsibilities.", 'layer_constraints': ['Must be a Single Page Application (SPA).', 'Must be fully responsive across mobile, tablet, and desktop viewports.', 'Must adhere to WCAG 2.1 Level AA accessibility standards.'], 'implementation_patterns': ['Component-Based Architecture (React)', 'Centralized State Management (Redux Toolkit)', 'Asynchronous API calls via RTK Query or Redux Thunks', 'Code-Splitting for performance optimization'], 'extraction_reasoning': 'The frontend-app repository is explicitly mapped to the presentation-layer in its definition. It is the architectural shell for this layer, responsible for establishing its core patterns and structure.'}

## 1.5.0.0 Dependency Interfaces

### 1.5.1.0 Interface Name

#### 1.5.1.1 Interface Name

ICalculatorApiGateway

#### 1.5.1.2 Source Repository

user-data-service

#### 1.5.1.3 Method Contracts

##### 1.5.1.3.1 Method Name

###### 1.5.1.3.1.1 Method Name

getUserProfile

###### 1.5.1.3.1.2 Method Signature

GET /api/v1/user/profile

###### 1.5.1.3.1.3 Method Purpose

Fetches the profile data for the authenticated user, including preferences and settings.

###### 1.5.1.3.1.4 Integration Context

Called immediately after successful login to hydrate the user state in the application.

##### 1.5.1.3.2.0 Method Name

###### 1.5.1.3.2.1 Method Name

getAllUserData

###### 1.5.1.3.2.2 Method Signature

GET /api/v1/user/all-data

###### 1.5.1.3.2.3 Method Purpose

Fetches all user-specific persisted data (history, variables, custom modes) in a single call.

###### 1.5.1.3.2.4 Integration Context

Called upon login to populate the application with the user's persisted state, optimizing initial data load.

##### 1.5.1.3.3.0 Method Name

###### 1.5.1.3.3.1 Method Name

persistUserData

###### 1.5.1.3.3.2 Method Signature

POST, PUT, DELETE /api/v1/{dataType}

###### 1.5.1.3.3.3 Method Purpose

Creates, updates, or deletes user-specific data on the backend (e.g., POST /history, PUT /variables/:name).

###### 1.5.1.3.3.4 Integration Context

Called by feature components when a user performs an action that needs to be persisted. These calls are intercepted for offline queuing.

##### 1.5.1.3.4.0 Method Name

###### 1.5.1.3.4.1 Method Name

executeCustomFormula

###### 1.5.1.3.4.2 Method Signature

POST /api/v1/modes/:id/execute

###### 1.5.1.3.4.3 Method Purpose

Sends a custom mode's input variables to the backend for secure execution by the formula-execution-service.

###### 1.5.1.3.4.4 Integration Context

Called when a user interacts with a launched custom mode.

#### 1.5.1.4.0.0 Integration Pattern

Asynchronous RESTful API calls using RTK Query.

#### 1.5.1.5.0.0 Communication Protocol

HTTPS with JSON payloads. Requests to protected endpoints must include a JWT Bearer token in the Authorization header.

#### 1.5.1.6.0.0 Extraction Reasoning

The SPA shell's core responsibility includes managing user sessions and orchestrating data, which requires a runtime dependency on the backend API Gateway for all user-specific operations.

### 1.5.2.0.0.0 Interface Name

#### 1.5.2.1.0.0 Interface Name

IIdentityProvider

#### 1.5.2.2.0.0 Source Repository

AWS Cognito

#### 1.5.2.3.0.0 Method Contracts

##### 1.5.2.3.1.0 Method Name

###### 1.5.2.3.1.1 Method Name

getAuthorizationUrl

###### 1.5.2.3.1.2 Method Signature

Constructs the URL for the /oauth2/authorize endpoint.

###### 1.5.2.3.1.3 Method Purpose

Initiates the login or registration flow by redirecting the user's browser to the Cognito Hosted UI. Must include PKCE challenge.

###### 1.5.2.3.1.4 Integration Context

Called when a user clicks 'Log In' or 'Register'.

##### 1.5.2.3.2.0 Method Name

###### 1.5.2.3.2.1 Method Name

exchangeCodeForTokens

###### 1.5.2.3.2.2 Method Signature

POST /oauth2/token

###### 1.5.2.3.2.3 Method Purpose

Exchanges an authorization code, obtained after successful login, for JWTs (access, refresh, ID tokens). Must include PKCE verifier.

###### 1.5.2.3.2.4 Integration Context

Called on the application's callback route after a user is redirected back from Cognito.

#### 1.5.2.4.0.0 Integration Pattern

OAuth 2.0 Authorization Code Flow with PKCE

#### 1.5.2.5.0.0 Communication Protocol

HTTPS and Browser Redirects

#### 1.5.2.6.0.0 Extraction Reasoning

This defines the critical, secure integration with the external authentication service as required by REQ-1-029 and REQ-1-039. This repository orchestrates the entire client-side flow.

### 1.5.3.0.0.0 Interface Name

#### 1.5.3.1.0.0 Interface Name

IUiComponentLibrary

#### 1.5.3.2.0.0 Source Repository

REPO-LIB-UI-COMPONENTS

#### 1.5.3.3.0.0 Method Contracts

##### 1.5.3.3.1.0 Method Name

###### 1.5.3.3.1.1 Method Name

OhmsLawCalculator

###### 1.5.3.3.1.2 Method Signature

React.FC<IProps>

###### 1.5.3.3.1.3 Method Purpose

Provides the UI and client-side logic for the Ohm's Law & Power calculator.

###### 1.5.3.3.1.4 Integration Context

Imported as a component and rendered by the application shell when the user navigates to the corresponding route.

##### 1.5.3.3.2.0 Method Name

###### 1.5.3.3.2.1 Method Name

CustomModeBuilder

###### 1.5.3.3.2.2 Method Signature

React.FC<IProps>

###### 1.5.3.3.2.3 Method Purpose

Provides the multi-step wizard UI for creating and editing custom calculation modes.

###### 1.5.3.3.2.4 Integration Context

Imported as a component and rendered by the application shell when the user initiates the custom mode creation/editing flow.

#### 1.5.3.4.0.0 Integration Pattern

NPM Package & React Component Composition

#### 1.5.3.5.0.0 Communication Protocol

Props and Callbacks

#### 1.5.3.6.0.0 Extraction Reasoning

The repository's architecture explicitly delegates complex feature UIs to this library. This is a primary compile-time dependency that defines the application's content.

### 1.5.4.0.0.0 Interface Name

#### 1.5.4.1.0.0 Interface Name

IFrontendUtilsLibrary

#### 1.5.4.2.0.0 Source Repository

REPO-LIB-FRONTEND-UTILS

#### 1.5.4.3.0.0 Method Contracts

##### 1.5.4.3.1.0 Method Name

###### 1.5.4.3.1.1 Method Name

OfflineSyncManager

###### 1.5.4.3.1.2 Method Signature

```python
class OfflineSyncManager
```

###### 1.5.4.3.1.3 Method Purpose

Provides a service to queue failed API requests in IndexedDB and sync them upon reconnection.

###### 1.5.4.3.1.4 Integration Context

Instantiated once at the application root. The application provides it with the current auth token and listens for its status events to update the UI.

##### 1.5.4.3.2.0 Method Name

###### 1.5.4.3.2.1 Method Name

parseWithSIPrefix

###### 1.5.4.3.2.2 Method Signature

```javascript
function(value: string): number
```

###### 1.5.4.3.2.3 Method Purpose

A utility function to parse strings containing SI prefixes (e.g., '10k').

###### 1.5.4.3.2.4 Integration Context

Imported and used within the API client or state management layer to normalize data before sending to components or the backend.

#### 1.5.4.4.0.0 Integration Pattern

NPM Package & Service Instantiation/Function Import

#### 1.5.4.5.0.0 Communication Protocol

In-process Method Calls and Custom Browser Events

#### 1.5.4.6.0.0 Extraction Reasoning

This repository must implement offline capabilities (REQ-1-014), which requires a runtime dependency on the service provided by this utility library.

### 1.5.5.0.0.0 Interface Name

#### 1.5.5.1.0.0 Interface Name

IApiContracts

#### 1.5.5.2.0.0 Source Repository

REPO-LIB-API-CONTRACTS

#### 1.5.5.3.0.0 Method Contracts

- {'method_name': 'N/A - Type Definitions', 'method_signature': "import type { CustomModeDto, UserDto } from '@calculator/api-contracts'", 'method_purpose': 'Provides TypeScript types for all API request and response payloads.', 'integration_context': 'Used throughout the data fetching layer (e.g., RTK Query slices) to ensure end-to-end type safety between the client and server.'}

#### 1.5.5.4.0.0 Integration Pattern

NPM Package & TypeScript Type Import

#### 1.5.5.5.0.0 Communication Protocol

N/A (Build-time)

#### 1.5.5.6.0.0 Extraction Reasoning

A critical build-time dependency that enables robust, type-safe API communication and eliminates a common class of integration errors.

### 1.5.6.0.0.0 Interface Name

#### 1.5.6.1.0.0 Interface Name

IDocumentationSite

#### 1.5.6.2.0.0 Source Repository

REPO-APP-DOCS

#### 1.5.6.3.0.0 Method Contracts

- {'method_name': 'Fetch Static Content', 'method_signature': 'GET /index.html, GET /assets/*', 'method_purpose': 'Fetches the pre-built static Docusaurus website for rendering.', 'integration_context': 'Triggered when the user clicks the in-app help icon. The content is loaded into a modal or iframe.'}

#### 1.5.6.4.0.0 Integration Pattern

Static Content Embedding

#### 1.5.6.5.0.0 Communication Protocol

HTTPS

#### 1.5.6.6.0.0 Extraction Reasoning

Fulfills REQ-1-025 by providing the mechanism to display the help content generated by the docs-site repository.

## 1.6.0.0.0.0 Exposed Interfaces

*No items available*

## 1.7.0.0.0.0 Technology Context

### 1.7.1.0.0.0 Framework Requirements

The application must be built using React (v18+) with TypeScript for static typing. Vite is the designated build tool. Redux Toolkit is the required library for global state management. All components must be functional components using React Hooks.

### 1.7.2.0.0.0 Integration Technologies

- react-router-dom: For client-side routing.
- RTK Query: For declarative data fetching, caching, and state synchronization.
- Cypress: For end-to-end integration testing.
- react-i18next: For implementing the internationalization (i18n) framework.
- aws-amplify or similar library: For orchestrating the OAuth 2.0 PKCE flow with AWS Cognito.

### 1.7.3.0.0.0 Performance Constraints

The application must achieve a Largest Contentful Paint (LCP) of under 2.5 seconds (REQ-1-041). This is to be addressed via aggressive route-based code-splitting (React.lazy) and lazy-loading of feature components from the UI library.

### 1.7.4.0.0.0 Security Requirements

The application shell must configure and serve appropriate HTTP security headers (CSP, HSTS). It handles the client-side of the OAuth 2.0 with PKCE authentication flow. JWTs received from the IdP must be handled securely (e.g., stored in memory, not localStorage).

## 1.8.0.0.0.0 Extraction Validation

| Property | Value |
|----------|-------|
| Mapping Completeness Check | All repository connections identified in the proje... |
| Cross Reference Validation | All extracted integration contracts are consistent... |
| Implementation Readiness Assessment | Readiness is high. The specification provides a co... |
| Quality Assurance Confirmation | Systematic validation confirms the extracted conte... |

