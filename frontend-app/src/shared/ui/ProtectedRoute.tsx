import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { AppRoutes } from '../config/routes';
import LoadingSpinner from './LoadingSpinner';
import { selectAuthStatus } from '../../features/auth/authSlice';

/**
 * A wrapper component that protects routes requiring authentication.
 * 
 * This component implements the client-side aspect of REQ-1-004 (User Account System)
 * by preventing unauthenticated users from accessing protected areas of the SPA.
 * 
 * It checks the authentication status from the global Redux store.
 * - If the user is authenticated, it renders the nested child routes via the <Outlet /> component.
 * - If the user is not authenticated, it redirects them to the login page.
 * - It also handles the 'loading' or 'initializing' auth state to prevent premature redirects
 *   while the app is still determining the user's auth status on initial load.
 * 
 * It preserves the user's intended destination (`location`) so they can be redirected back
 * after a successful login, providing a seamless user experience.
 */
const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authStatus = useSelector(selectAuthStatus);
  const location = useLocation();

  // While the auth state is being initialized (e.g., checking for a token on app load),
  // show a loading spinner to prevent a flicker or premature redirect.
  if (authStatus === 'initializing' || authStatus === 'loading') {
    return <LoadingSpinner />;
  }

  // If authenticated, allow access to the requested child route.
  if (isAuthenticated) {
    return <Outlet />;
  }
  
  // If not authenticated, redirect to the login page.
  // We pass the current location in the state object. This allows the login page
  // to redirect the user back to their originally intended page after a successful login.
  return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
};

export default ProtectedRoute;