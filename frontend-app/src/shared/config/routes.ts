/**
 * @file routes.ts
 * @description Centralized route path definitions for the application.
 * Using a centralized file for route paths prevents magic strings in components
 * and makes route management more maintainable and less error-prone.
 * Corresponds to the need for a scalable routing structure as defined in the SDS.
 */

/**
 * An immutable object containing all application route paths.
 * Freezing the object prevents accidental modification at runtime.
 */
export const ROUTE_PATHS = Object.freeze({
  /**
   * The main application page, typically showing the core calculator.
   * Corresponds to `HomePage.tsx`.
   */
  HOME: '/',

  /**
   * The user login page.
   * Corresponds to `LoginPage.tsx` and requirement REQ-1-004.
   */
  LOGIN: '/login',

  /**
   * The user registration page.
   * Corresponds to `RegisterPage.tsx` and requirement REQ-1-004.
   */
  REGISTER: '/register',

  /**
   * The callback route for the OAuth 2.0 authentication flow.
   * This page is responsible for handling the redirect from the identity provider (AWS Cognito).
   * Corresponds to `AuthCallbackPage.tsx` and requirement REQ-1-039.
   */
  AUTH_CALLBACK: '/auth/callback',

  /**
   * The page for managing user-created custom calculation modes.
   * Corresponds to `CustomModesPage.tsx` and requirement REQ-1-003.
   */
  CUSTOM_MODES: '/modes',

  /**
   * A catch-all route for displaying a "Not Found" page for any unmatched URL.
   * Corresponds to `NotFoundPage.tsx`.
   */
  NOT_FOUND: '*',
});