# 1 Design

code_design

# 2 Code Specfication

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | frontend-app |
| Validation Timestamp | 2024-05-24T11:00:00Z |
| Original Component Count Claimed | 15 |
| Original Component Count Actual | 15 |
| Gaps Identified Count | 18 |
| Components Added Count | 18 |
| Final Component Count | 33 |
| Validation Completeness Score | 100% |
| Enhancement Methodology | Systematic validation of a baseline SPA shell spec... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

High. The initial specification for a basic SPA shell was compliant but lacked the depth required for an enterprise application. Gaps were identified in application orchestration, state management, and resilience.

#### 2.2.1.2 Gaps Identified

- Missing specifications for core application pages (Login, Register, Auth Callback, 404).
- Missing specification for the complete authentication flow logic (OAuth 2.0 PKCE).
- Missing specification for a global React Error Boundary.
- Missing specification for a centralized API data fetching and caching layer.
- Missing specification for integrating the offline synchronization library.
- Missing specification for test suite configurations (Vitest, Cypress).

#### 2.2.1.3 Components Added

- LoginPage.tsx
- RegisterPage.tsx
- AuthCallbackPage.tsx
- NotFoundPage.tsx
- ErrorBoundary.tsx
- apiSlice.ts (RTK Query)
- authSlice.ts
- useAuth.ts
- apiErrorMiddleware.ts
- offlineSlice.ts
- useOfflineManager.ts
- vitest.config.ts
- cypress.config.ts

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

100%

#### 2.2.2.2 Non Functional Requirements Coverage

100%

#### 2.2.2.3 Missing Requirement Components

- UI components and logic to fulfill REQ-1-004 (User Account System).
- Mechanism to trigger the guided tour for REQ-1-073.
- Implementation details for accessibility landmarks and skip links for REQ-1-034.
- Code structure for handling offline data modifications via REQ-1-014.

#### 2.2.2.4 Added Requirement Components

- Specifications for LoginPage.tsx, RegisterPage.tsx, and AuthCallbackPage.tsx.
- Specification for onboardingHooks.ts to orchestrate the guided tour.
- Enhanced specification for MainLayout.tsx to include accessibility requirements.
- Specifications for offlineSlice.ts, useOfflineManager.ts, and an offline-aware RTK Query baseQuery.

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

The baseline SPA was enhanced to fully implement Feature-Sliced Design, a declarative data layer with RTK Query, and robust resilience patterns.

#### 2.2.3.2 Missing Pattern Components

- A global API error handling middleware.
- A clear implementation of the Container/Presentational pattern for pages.
- The full specification for the Provider Pattern at the application root.

#### 2.2.3.3 Added Pattern Components

- apiErrorMiddleware.ts specification.
- Enhanced specifications for all page components to clarify their role as containers.
- Detailed specification for App.tsx as the composition root for all providers.

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A. Validation confirms the repository correctly abstains from direct database interaction, adhering to architectural boundaries.

#### 2.2.4.2 Missing Database Components

*No items available*

#### 2.2.4.3 Added Database Components

*No items available*

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Significant gaps were found in the user login and offline sync sequences.

#### 2.2.5.2 Missing Interaction Components

- The entire specification for handling the OAuth 2.0 redirect from the identity provider, breaking the login flow.
- Specification for orchestrating post-login data fetches.
- Specification for how failed API calls are intercepted and queued for offline sync.

#### 2.2.5.3 Added Interaction Components

- Specification for AuthCallbackPage.tsx to handle the code-for-token exchange.
- Specification for a Redux listener middleware to orchestrate data fetching after login.
- Enhanced specification for the RTK Query `baseQuery` to intercept network failures and delegate to the offline manager.

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

| Property | Value |
|----------|-------|
| Repository Id | frontend-app |
| Technology Stack | React, Redux Toolkit, Vite, TypeScript, React Rout... |
| Technology Guidance Integration | Specification fully aligns with Feature-Sliced Des... |
| Framework Compliance Score | 100% |
| Specification Completeness | 100% |
| Component Count | 33 |
| Specification Methodology | Component-Based Architecture with Centralized Stat... |

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- Feature-Sliced Design
- Provider Pattern (for Redux, Router, Theme, ErrorBoundary, i18n)
- Container/Presentational Pattern (Pages as Containers)
- Custom Hooks for Logic Encapsulation
- Declarative Data Fetching with RTK Query
- Code-Splitting with React.lazy and Suspense
- Offline-First Integration

#### 2.3.2.2 Directory Structure Source

React, Redux Toolkit, and Vite best practices, adapted for a feature-centric SPA shell.

#### 2.3.2.3 Naming Conventions Source

Standard TypeScript/React naming conventions (PascalCase for components, camelCase for functions/hooks).

#### 2.3.2.4 Architectural Patterns Source

Single Page Application (SPA) with centralized state and client-side routing.

#### 2.3.2.5 Performance Optimizations Applied

- Route-based code-splitting via React.lazy and Suspense for all page-level components.
- RTK Query for automated caching, re-fetching, and de-duplication of API requests.
- Memoization of components (React.memo) and hooks (useMemo, useCallback) where performance profiling indicates necessity.
- Vite's optimized build process for minimal bundle size and efficient asset handling.

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

src/app

###### 2.3.3.1.1.2 Purpose

Core application setup, including the Redux store, listener middleware, main router, and the root App component.

###### 2.3.3.1.1.3 Contains Files

- main.tsx
- store.ts
- listenerMiddleware.ts
- App.tsx
- router.tsx

###### 2.3.3.1.1.4 Organizational Reasoning

Centralizes application bootstrap, global state configuration, and routing, following Redux Toolkit and React Router conventions.

###### 2.3.3.1.1.5 Framework Convention Alignment

Standard for enterprise-grade React/Redux applications.

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

src/pages

###### 2.3.3.1.2.2 Purpose

Top-level components for each application route. These act as \"container\" components that orchestrate data fetching and render feature components. All components in this directory must be specified for lazy loading.

###### 2.3.3.1.2.3 Contains Files

- HomePage.tsx
- LoginPage.tsx
- RegisterPage.tsx
- AuthCallbackPage.tsx
- CustomModesPage.tsx
- NotFoundPage.tsx

###### 2.3.3.1.2.4 Organizational Reasoning

Separates route-level concerns from reusable UI, enabling route-based code-splitting for optimal performance.

###### 2.3.3.1.2.5 Framework Convention Alignment

Common pattern for performant React Router applications.

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

src/widgets

###### 2.3.3.1.3.2 Purpose

Complex UI compositions, like the main header or sidebar, that are reused across multiple pages.

###### 2.3.3.1.3.3 Contains Files

- Header.tsx
- Sidebar.tsx
- MainLayout.tsx

###### 2.3.3.1.3.4 Organizational Reasoning

Separates complex, reusable layout sections from page-specific logic, aligning with Feature-Sliced Design.

###### 2.3.3.1.3.5 Framework Convention Alignment

Feature-Sliced Design convention.

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

src/features

###### 2.3.3.1.4.2 Purpose

Houses all application-level state and logic, organized by domain. This is the core of the application's business logic.

###### 2.3.3.1.4.3 Contains Files

- api/apiSlice.ts
- api/apiErrorMiddleware.ts
- auth/authSlice.ts
- auth/useAuth.ts
- ui/uiSlice.ts
- user/userApi.ts
- onboarding/onboardingHooks.ts
- offline/offlineSlice.ts
- offline/useOfflineManager.ts

###### 2.3.3.1.4.4 Organizational Reasoning

Implements Feature-Sliced Design for scalability and maintainability, co-locating state, actions, and API definitions.

###### 2.3.3.1.4.5 Framework Convention Alignment

Best practice for structuring large Redux Toolkit applications.

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

src/shared

###### 2.3.3.1.5.2 Purpose

Contains truly shared, application-agnostic code, such as UI components (spinners), config, and services.

###### 2.3.3.1.5.3 Contains Files

- ui/LoadingSpinner.tsx
- ui/ErrorBoundary.tsx
- ui/ProtectedRoute.tsx
- config/routes.ts
- services/i18n.ts

###### 2.3.3.1.5.4 Organizational Reasoning

Promotes reusability and follows Feature-Sliced Design principles for shared kernel code.

###### 2.3.3.1.5.5 Framework Convention Alignment

Feature-Sliced Design convention.

#### 2.3.3.2.0.0 Namespace Strategy

| Property | Value |
|----------|-------|
| Root Namespace | N/A (File-based modules) |
| Namespace Organization | Modules are organized by feature and responsibilit... |
| Naming Conventions | PascalCase for components and types, camelCase for... |
| Framework Alignment | Standard for the React/TypeScript ecosystem. |

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

App.tsx

##### 2.3.4.1.2.0 File Path

src/app/App.tsx

##### 2.3.4.1.3.0 Class Type

React Root Component

##### 2.3.4.1.4.0 Inheritance

React.FC

##### 2.3.4.1.5.0 Purpose

Specification for the root component of the application. It must be specified to set up global providers (Redux, Router, Theme, i18n, ErrorBoundary) and render the application's routes.

##### 2.3.4.1.6.0 Dependencies

- react-router-dom
- react-redux
- react-i18next
- ./store
- ./router

##### 2.3.4.1.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.1.8.0 Technology Integration Notes

Serves as the composition root for the entire SPA, wrapping all other components with necessary context providers.

##### 2.3.4.1.9.0 Properties

*No items available*

##### 2.3.4.1.10.0 Methods

*No items available*

##### 2.3.4.1.11.0 Events

*No items available*

##### 2.3.4.1.12.0 Implementation Notes

Specification requires this component to render the main router provider (`RouterProvider`). It must be specified to be wrapped by the Redux `<Provider>` and other global providers in `main.tsx`. This component should also be specified to consume the `onboardingHooks` to trigger the guided tour for first-time users and initialize the offline manager using `useOfflineManager`.

#### 2.3.4.2.0.0 Class Name

##### 2.3.4.2.1.0 Class Name

MainLayout.tsx

##### 2.3.4.2.2.0 File Path

src/widgets/MainLayout.tsx

##### 2.3.4.2.3.0 Class Type

React Layout Component

##### 2.3.4.2.4.0 Inheritance

React.FC

##### 2.3.4.2.5.0 Purpose

Specification for the primary responsive layout of the application, including the header, sidebar, and main content area.

##### 2.3.4.2.6.0 Dependencies

- react-router-dom (for Outlet)
- @mui/material
- ./Header.tsx
- ./Sidebar.tsx

##### 2.3.4.2.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.2.8.0 Technology Integration Notes

Specification requires this component to implement the responsive design for REQ-1-005 using Material-UI's `useTheme` and `useMediaQuery` hooks.

##### 2.3.4.2.9.0 Properties

*No items available*

##### 2.3.4.2.10.0 Methods

*No items available*

##### 2.3.4.2.11.0 Events

*No items available*

##### 2.3.4.2.12.0 Implementation Notes

Specification requires rendering a persistent `Header` and `Sidebar`. The main content area must render the `Outlet` from `react-router-dom`. Critically, for REQ-1-034, it must be specified to implement HTML5 landmark elements (`<header>`, `<nav>`, `<main>`) and include a visually-hidden \"Skip to Content\" link at the top of the DOM for accessibility.

#### 2.3.4.3.0.0 Class Name

##### 2.3.4.3.1.0 Class Name

ProtectedRoute.tsx

##### 2.3.4.3.2.0 File Path

src/shared/ui/ProtectedRoute.tsx

##### 2.3.4.3.3.0 Class Type

React Wrapper Component

##### 2.3.4.3.4.0 Inheritance

React.FC

##### 2.3.4.3.5.0 Purpose

Specification for a wrapper component that protects routes requiring authentication by checking global state.

##### 2.3.4.3.6.0 Dependencies

- react-router-dom (for Navigate, Outlet)
- react-redux (for useSelector)
- ../../features/auth/authSlice

##### 2.3.4.3.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.3.8.0 Technology Integration Notes

Specification requires direct integration with the Redux `authSlice` to determine authentication status.

##### 2.3.4.3.9.0 Properties

*No items available*

##### 2.3.4.3.10.0 Methods

*No items available*

##### 2.3.4.3.11.0 Events

*No items available*

##### 2.3.4.3.12.0 Implementation Notes

Specification requires using the `useSelector` hook to get `isAuthenticated` status. If false, it must render `<Navigate to=\"/login\" replace />`. If true, it must render `<Outlet />` to display the nested child routes.

#### 2.3.4.4.0.0 Class Name

##### 2.3.4.4.1.0 Class Name

ErrorBoundary.tsx

##### 2.3.4.4.2.0 File Path

src/shared/ui/ErrorBoundary.tsx

##### 2.3.4.4.3.0 Class Type

React Component

##### 2.3.4.4.4.0 Inheritance

React.Component

##### 2.3.4.4.5.0 Purpose

Specification to create a component that catches JavaScript errors in its child component tree, logs them, and displays a fallback UI, preventing a full application crash.

##### 2.3.4.4.6.0 Dependencies

- React

##### 2.3.4.4.7.0 Framework Specific Attributes

*No items available*

##### 2.3.4.4.8.0 Technology Integration Notes

This must be a class component to use `componentDidCatch`.

##### 2.3.4.4.9.0 Properties

*No items available*

##### 2.3.4.4.10.0 Methods

###### 2.3.4.4.10.1 Method Name

####### 2.3.4.4.10.1.1 Method Name

getDerivedStateFromError

####### 2.3.4.4.10.1.2 Method Signature

static getDerivedStateFromError(error: Error)

####### 2.3.4.4.10.1.3 Return Type

{ hasError: boolean }

####### 2.3.4.4.10.1.4 Purpose

Specification for a lifecycle method to update state so the next render will show the fallback UI.

###### 2.3.4.4.10.2.0 Method Name

####### 2.3.4.4.10.2.1 Method Name

componentDidCatch

####### 2.3.4.4.10.2.2 Method Signature

componentDidCatch(error: Error, errorInfo: React.ErrorInfo)

####### 2.3.4.4.10.2.3 Return Type

void

####### 2.3.4.4.10.2.4 Purpose

Specification for a lifecycle method to log error information to an external service.

##### 2.3.4.4.11.0.0 Events

*No items available*

##### 2.3.4.4.12.0.0 Implementation Notes

Specification requires this component to be wrapped around the main router in `App.tsx` to provide application-wide error handling for rendering.

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

LoginPage.tsx

##### 2.3.4.5.2.0.0 File Path

src/pages/LoginPage.tsx

##### 2.3.4.5.3.0.0 Class Type

React Page Component

##### 2.3.4.5.4.0.0 Inheritance

React.FC

##### 2.3.4.5.5.0.0 Purpose

Specification for the container component that handles the user login flow, orchestrating UI components and authentication logic.

##### 2.3.4.5.6.0.0 Dependencies

- ../features/auth/useAuth.ts
- @calculator/ui-components-library (for LoginForm component)

##### 2.3.4.5.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.5.8.0.0 Technology Integration Notes

This component is required by REQ-1-004.

##### 2.3.4.5.9.0.0 Properties

*No items available*

##### 2.3.4.5.10.0.0 Methods

*No items available*

##### 2.3.4.5.11.0.0 Events

*No items available*

##### 2.3.4.5.12.0.0 Implementation Notes

Specification requires this component to be a \"container\". It must use the `useAuth` hook to get the `login` function. It should be specified to render a presentational `LoginForm` from the UI library and pass the `login` function to it as a prop. It must be specified for lazy-loading in `router.tsx`.

#### 2.3.4.6.0.0.0 Class Name

##### 2.3.4.6.1.0.0 Class Name

AuthCallbackPage.tsx

##### 2.3.4.6.2.0.0 File Path

src/pages/AuthCallbackPage.tsx

##### 2.3.4.6.3.0.0 Class Type

React Page Component

##### 2.3.4.6.4.0.0 Inheritance

React.FC

##### 2.3.4.6.5.0.0 Purpose

Specification for a critical but transient page that handles the OAuth 2.0 redirect from Cognito. Its sole purpose is to exchange the authorization code for tokens.

##### 2.3.4.6.6.0.0 Dependencies

- react-router-dom (for useSearchParams)
- ../features/auth/useAuth.ts

##### 2.3.4.6.7.0.0 Framework Specific Attributes

*No items available*

##### 2.3.4.6.8.0.0 Technology Integration Notes

This component is critical to complete the login sequence and fulfill REQ-1-039.

##### 2.3.4.6.9.0.0 Properties

*No items available*

##### 2.3.4.6.10.0.0 Methods

*No items available*

##### 2.3.4.6.11.0.0 Events

*No items available*

##### 2.3.4.6.12.0.0 Implementation Notes

Specification requires this component to, on render, parse the \"code\" from the URL query parameters. It will then be specified to call a method (e.g., `handleRedirectCallback`) from the `useAuth` hook to perform the token exchange. It should display a loading spinner while processing and then navigate the user to the home page on success or an error page on failure.

### 2.3.5.0.0.0.0 Interface Specifications

#### 2.3.5.1.0.0.0 Interface Name

##### 2.3.5.1.1.0.0 Interface Name

apiSlice.ts

##### 2.3.5.1.2.0.0 File Path

src/features/api/apiSlice.ts

##### 2.3.5.1.3.0.0 Purpose

Specification for the core RTK Query API slice, defining the base query and API interaction configuration.

##### 2.3.5.1.4.0.0 Generic Constraints

None

##### 2.3.5.1.5.0.0 Framework Specific Inheritance

createApi from @reduxjs/toolkit/query/react

##### 2.3.5.1.6.0.0 Method Contracts

*No items available*

##### 2.3.5.1.7.0.0 Property Contracts

- {'property_name': 'baseQuery', 'property_type': 'Function', 'getter_contract': 'Specification for a `fetchBaseQuery` function. It must be specified to set the `baseUrl` from `VITE_API_BASE_URL` and include a `prepareHeaders` function.', 'setter_contract': 'N/A'}

##### 2.3.5.1.8.0.0 Implementation Guidance

Enhanced specification: The `prepareHeaders` function must be specified to read the auth token from the Redux `authSlice` state and add it to the `Authorization` header. This slice must also define tags (e.g., \"User\", \"History\", \"Modes\") for cache invalidation. A custom wrapper around `fetchBaseQuery` will be implemented to intercept network errors and delegate the failed request to the `OfflineSyncManager` for queuing, thus fulfilling REQ-1-014.

#### 2.3.5.2.0.0.0 Interface Name

##### 2.3.5.2.1.0.0 Interface Name

authSlice.ts

##### 2.3.5.2.2.0.0 File Path

src/features/auth/authSlice.ts

##### 2.3.5.2.3.0.0 Purpose

Specification for the Redux Toolkit \"slice\" managing user authentication state.

##### 2.3.5.2.4.0.0 Generic Constraints

None

##### 2.3.5.2.5.0.0 Framework Specific Inheritance

createSlice from @reduxjs/toolkit

##### 2.3.5.2.6.0.0 Method Contracts

###### 2.3.5.2.6.1.0 Method Name

####### 2.3.5.2.6.1.1 Method Name

setCredentials

####### 2.3.5.2.6.1.2 Method Signature

Reducer function

####### 2.3.5.2.6.1.3 Return Type

void

####### 2.3.5.2.6.1.4 Parameters

- {'parameter_name': 'action', 'parameter_type': 'PayloadAction<{ user: User | null; token: string | null }>'}

####### 2.3.5.2.6.1.5 Contract Description

Specification for a reducer that updates the state with user profile and JWT on successful login.

####### 2.3.5.2.6.1.6 Exception Contracts

N/A

###### 2.3.5.2.6.2.0 Method Name

####### 2.3.5.2.6.2.1 Method Name

logout

####### 2.3.5.2.6.2.2 Method Signature

Reducer function

####### 2.3.5.2.6.2.3 Return Type

void

####### 2.3.5.2.6.2.4 Parameters

*No items available*

####### 2.3.5.2.6.2.5 Contract Description

Specification for a reducer that resets the auth state to its initial values.

####### 2.3.5.2.6.2.6 Exception Contracts

N/A

##### 2.3.5.2.7.0.0 Property Contracts

- {'property_name': 'initialState', 'property_type': 'AuthState { user: null, token: null, status: \\"idle\\" }', 'getter_contract': 'Defines the initial shape of the authentication state.', 'setter_contract': 'N/A'}

##### 2.3.5.2.8.0.0 Implementation Guidance

Specification requires the export of generated actions, the reducer, and memoized selectors (`selectCurrentUser`, `selectIsAuthenticated`) for efficient state consumption by components.

#### 2.3.5.3.0.0.0 Interface Name

##### 2.3.5.3.1.0.0 Interface Name

useOfflineManager.ts

##### 2.3.5.3.2.0.0 File Path

src/features/offline/useOfflineManager.ts

##### 2.3.5.3.3.0.0 Purpose

Specification for a custom React hook that initializes and manages the lifecycle of the OfflineSyncManager service from the frontend-utils library.

##### 2.3.5.3.4.0.0 Generic Constraints

None

##### 2.3.5.3.5.0.0 Framework Specific Inheritance

N/A

##### 2.3.5.3.6.0.0 Method Contracts

*No items available*

##### 2.3.5.3.7.0.0 Property Contracts

*No items available*

##### 2.3.5.3.8.0.0 Implementation Guidance

This hook should be called once at the application's root (`App.tsx`). It will be responsible for: 1. Instantiating the `OfflineSyncManager`. 2. Subscribing to Redux store updates to provide the manager with the current auth token. 3. Setting up event listeners for the manager's `sync:*` events. 4. Dispatching actions to the `offlineSlice` to update the UI based on sync status (e.g., show a 'Syncing...' indicator).

#### 2.3.5.4.0.0.0 Interface Name

##### 2.3.5.4.1.0.0 Interface Name

apiErrorMiddleware.ts

##### 2.3.5.4.2.0.0 File Path

src/features/api/apiErrorMiddleware.ts

##### 2.3.5.4.3.0.0 Purpose

Specification for a Redux Toolkit middleware designed to listen for rejected API actions from RTK Query and dispatch global UI notifications.

##### 2.3.5.4.4.0.0 Generic Constraints

Middleware from \"@reduxjs/toolkit\"

##### 2.3.5.4.5.0.0 Framework Specific Inheritance

isRejectedWithValue from \"@reduxjs/toolkit\"

##### 2.3.5.4.6.0.0 Method Contracts

*No items available*

##### 2.3.5.4.7.0.0 Property Contracts

*No items available*

##### 2.3.5.4.8.0.0 Implementation Guidance

The specification requires it to be a listener middleware. It must be specified to check if an incoming action is a rejected thunk from an API slice (`action.type.endsWith(\"/rejected\")`). If so, and if the error is not a network error (which is handled by the offline manager), it should be specified to extract the error payload and dispatch a new action to the `uiSlice` to show a notification (e.g., a toast message) to the user.

### 2.3.6.0.0.0.0 Enum Specifications

*No items available*

### 2.3.7.0.0.0.0 Dto Specifications

*No items available*

### 2.3.8.0.0.0.0 Configuration Specifications

#### 2.3.8.1.0.0.0 Configuration Name

##### 2.3.8.1.1.0.0 Configuration Name

Vite Configuration

##### 2.3.8.1.2.0.0 File Path

vite.config.ts

##### 2.3.8.1.3.0.0 Purpose

Specification for configuring the Vite build tool.

##### 2.3.8.1.4.0.0 Framework Base Class

defineConfig from \"vite\"

##### 2.3.8.1.5.0.0 Configuration Sections

*No items available*

##### 2.3.8.1.6.0.0 Validation Requirements

Specification requires this file to configure the React plugin, development server settings, path aliases for module resolution (e.g., `@/features`), and production build options like sourcemaps.

#### 2.3.8.2.0.0.0 Configuration Name

##### 2.3.8.2.1.0.0 Configuration Name

Environment Variables

##### 2.3.8.2.2.0.0 File Path

.env

##### 2.3.8.2.3.0.0 Purpose

Specification for defining environment-specific variables for the application.

##### 2.3.8.2.4.0.0 Framework Base Class

N/A

##### 2.3.8.2.5.0.0 Configuration Sections

*No items available*

##### 2.3.8.2.6.0.0 Validation Requirements

Specification requires this file to define all necessary keys prefixed with `VITE_`, including `VITE_API_BASE_URL` and all `VITE_COGNITO_*` variables needed for the auth flow.

### 2.3.9.0.0.0.0 Dependency Injection Specifications

*No items available*

### 2.3.10.0.0.0.0 External Integration Specifications

#### 2.3.10.1.0.0.0 Integration Target

##### 2.3.10.1.1.0.0 Integration Target

ICalculatorApiGateway

##### 2.3.10.1.2.0.0 Integration Type

HTTP REST API

##### 2.3.10.1.3.0.0 Required Client Classes

- apiSlice.ts (RTK Query)

##### 2.3.10.1.4.0.0 Configuration Requirements

Specification requires Base URL to be provided via `VITE_API_BASE_URL`.

##### 2.3.10.1.5.0.0 Error Handling Requirements

Enhanced specification requires a global Redux middleware (`apiErrorMiddleware.ts`) for handling API errors. Network errors are intercepted by a custom `baseQuery` wrapper and delegated to the offline sync service.

##### 2.3.10.1.6.0.0 Authentication Requirements

Enhanced specification requires the `prepareHeaders` function in the `baseQuery` to retrieve the token from the `authSlice` and attach it as a `Bearer` token.

##### 2.3.10.1.7.0.0 Framework Integration Patterns

Specification confirms declarative data fetching will be implemented using Redux Toolkit Query, with a custom `baseQuery` to support offline capabilities.

#### 2.3.10.2.0.0.0 Integration Target

##### 2.3.10.2.1.0.0 Integration Target

AWS Cognito

##### 2.3.10.2.2.0.0 Integration Type

Identity Provider (IdP)

##### 2.3.10.2.3.0.0 Required Client Classes

- useAuth.ts
- AuthCallbackPage.tsx

##### 2.3.10.2.4.0.0 Configuration Requirements

Specification requires Cognito User Pool ID, Client ID, and Domain to be provided via environment variables.

##### 2.3.10.2.5.0.0 Error Handling Requirements

Enhanced specification requires the `AuthCallbackPage.tsx` component to handle error responses from Cognito in the URL and display an appropriate message.

##### 2.3.10.2.6.0.0 Authentication Requirements

Enhanced specification requires the authentication flow to explicitly implement the OAuth 2.0 Authorization Code flow with PKCE (REQ-1-039). The `useAuth` hook will be specified to generate the `code_verifier` and `code_challenge`, and the `AuthCallbackPage.tsx` will be specified to handle the code exchange.

##### 2.3.10.2.7.0.0 Framework Integration Patterns

Specification confirms manual construction of OAuth 2.0 URLs for greater control over the PKCE flow.

#### 2.3.10.3.0.0.0 Integration Target

##### 2.3.10.3.1.0.0 Integration Target

IUiComponentLibrary (REPO-LIB-UI-COMPONENTS)

##### 2.3.10.3.2.0.0 Integration Type

NPM Package

##### 2.3.10.3.3.0.0 Required Client Classes

- All page components (HomePage.tsx, CustomModesPage.tsx, etc.)

##### 2.3.10.3.4.0.0 Configuration Requirements

Specification requires the library to be a dependency in `package.json`.

##### 2.3.10.3.5.0.0 Error Handling Requirements

Enhanced specification requires the main application router in `App.tsx` to be wrapped in the `ErrorBoundary.tsx` component to handle rendering errors from the library.

##### 2.3.10.3.6.0.0 Authentication Requirements

N/A

##### 2.3.10.3.7.0.0 Framework Integration Patterns

Specification requires feature components to be imported using `React.lazy()` for code-splitting and rendered within `<Suspense>` boundaries to meet performance requirements.

#### 2.3.10.4.0.0.0 Integration Target

##### 2.3.10.4.1.0.0 Integration Target

IOfflineSyncManager (REPO-LIB-FRONTEND-UTILS)

##### 2.3.10.4.2.0.0 Integration Type

NPM Package

##### 2.3.10.4.3.0.0 Required Client Classes

- useOfflineManager.ts
- apiSlice.ts

##### 2.3.10.4.4.0.0 Configuration Requirements

Specification requires the library to be a dependency in `package.json`.

##### 2.3.10.4.5.0.0 Error Handling Requirements

The `useOfflineManager` hook is specified to listen to error events from the manager and dispatch actions to update the UI accordingly.

##### 2.3.10.4.6.0.0 Authentication Requirements

The `useOfflineManager` hook is specified to provide the sync manager with the latest JWT from the Redux store for authenticating its background requests.

##### 2.3.10.4.7.0.0 Framework Integration Patterns

The primary integration point is a custom RTK Query `baseQuery` that wraps the default `fetchBaseQuery`. On a network failure, this wrapper calls the `OfflineSyncManager.queueRequest` method instead of returning an error, seamlessly integrating offline support into the data layer.

# 3.0.0.0.0.0.0 File Structure

## 3.1.0.0.0.0.0 Directory Organization

### 3.1.1.0.0.0.0 Directory Path

#### 3.1.1.1.0.0.0 Directory Path

/

#### 3.1.1.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.1.3.0.0.0 Contains Files

- package.json
- tsconfig.json
- tsconfig.node.json
- .editorconfig
- .env.example
- vite.config.ts
- Dockerfile
- nginx.conf
- vitest.config.ts
- cypress.config.ts
- .eslintrc.cjs
- .prettierrc.json
- .gitignore

#### 3.1.1.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.1.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.2.0.0.0.0 Directory Path

#### 3.1.2.1.0.0.0 Directory Path

.vscode

#### 3.1.2.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.2.3.0.0.0 Contains Files

- settings.json
- extensions.json

#### 3.1.2.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.2.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.3.0.0.0.0 Directory Path

#### 3.1.3.1.0.0.0 Directory Path

public

#### 3.1.3.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.3.3.0.0.0 Contains Files

- index.html

#### 3.1.3.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.3.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

