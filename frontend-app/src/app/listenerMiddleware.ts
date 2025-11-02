import { createListenerMiddleware, isAnyOf, TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { authSlice } from '../features/auth/authSlice';
import { uiSlice } from '../features/ui/uiSlice';
import { userApi } from '../features/user/userApi';
import { apiSlice } from '../features/api/apiSlice';

/**
 * Type-safe startListening instance
 */
type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const appListenerMiddleware = createListenerMiddleware();

const startAppListening = appListenerMiddleware.startListening as AppStartListening;

/**
 * Listener for successful user authentication.
 * This is responsible for orchestrating post-login side effects,
 * such as fetching user data and triggering onboarding for new users.
 * 
 * Fulfills aspects of REQ-1-004 and REQ-1-073.
 */
startAppListening({
  matcher: isAnyOf(authSlice.actions.setCredentials),
  effect: async (action, listenerApi) => {
    // Check if this is a login action (token is present)
    if (action.payload.token && action.payload.user) {
      console.log('User logged in. Fetching all user data...');

      // Dispatch action to fetch all user data upon login.
      // This hydrates the application with the user's persisted state.
      // Fulfills REQ-1-004 validation criteria: "Verify that upon login, the user's specific history, variables, and custom modes are loaded."
      listenerApi.dispatch(userApi.endpoints.getAllUserData.initiate());

      // TODO: The `isFirstLogin` flag should come from the user profile in the backend.
      // For now, we simulate this to fulfill REQ-1-073.
      const isFirstLogin = action.payload.user.isFirstLogin ?? false; 

      if (isFirstLogin) {
        // Use a small delay to ensure the main UI has mounted and is visible.
        await listenerApi.delay(1000);
        console.log('First time login detected. Starting onboarding tour.');
        listenerApi.dispatch(uiSlice.actions.startOnboardingTour());
      }
    }
  },
});

/**
 * Listener for user logout.
 * This is responsible for cleaning up all cached user data from the API slice,
 * ensuring that no stale data is visible if another user logs in.
 */
startAppListening({
  actionCreator: authSlice.actions.logout,
  effect: async (action, listenerApi) => {
    console.log('User logged out. Resetting API state.');
    // This action from RTK Query will completely clear the cache of all endpoints.
    listenerApi.dispatch(apiSlice.util.resetApiState());
  },
});