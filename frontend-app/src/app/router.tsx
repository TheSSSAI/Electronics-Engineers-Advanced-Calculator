import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import MainLayout from '../widgets/MainLayout';
import ProtectedRoute from '../shared/ui/ProtectedRoute';
import LoadingSpinner from '../shared/ui/LoadingSpinner';
import { ROUTES } from '../shared/config/routes';
import ErrorBoundary from '../shared/ui/ErrorBoundary';

// Lazy load all page components for route-based code splitting.
// This is a critical performance optimization to meet REQ-1-041 (LCP < 2.5s).
const HomePage = React.lazy(() => import('../pages/HomePage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const AuthCallbackPage = React.lazy(() => import('../pages/AuthCallbackPage'));
const CustomModesPage = React.lazy(() => import('../pages/CustomModesPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

/**
 * Defines the application's routes using React Router v6's data router API.
 * 
 * - Encapsulates all routes within an ErrorBoundary for graceful error handling.
 * - Uses a MainLayout for consistent UI structure across pages.
 * - Implements lazy loading with Suspense for all page-level components to optimize performance.
 * - Protects authenticated routes using the `ProtectedRoute` component, fulfilling REQ-1-004.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MainLayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ROUTES.CUSTOM_MODES,
            element: <CustomModesPage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.AUTH_CALLBACK,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthCallbackPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      }
    ],
  },
]);