import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { showNotification } from '../ui/uiSlice';

interface RejectedActionPayload {
  status: number;
  data: {
    message: string | string[];
    error?: string;
    statusCode?: number;
  };
}

/**
 * `apiErrorMiddleware`
 * This middleware listens for rejected RTK Query actions and dispatches a `showNotification`
 * action to display a global error toast to the user.
 *
 * It filters out specific errors that are handled by other parts of the application:
 * - 401 Unauthorized: Handled by an auth listener to trigger logout.
 * - 'FETCH_ERROR': Indicates a network failure, handled by the offline sync manager.
 * - 409 Conflict: Often used for optimistic locking or 'last-write-wins' scenarios
 *   and is handled gracefully by the offline sync logic, so we don't show a generic error.
 */
export const apiErrorMiddleware: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as RejectedActionPayload;
      
      // Log the full error for debugging purposes in development
      if (import.meta.env.DEV) {
        console.warn('API call rejected:', action);
      }
      
      // Do not show notifications for certain statuses that are handled elsewhere
      const ignoredStatuses: (number | string)[] = [401, 409];
      if (
        (payload.status && ignoredStatuses.includes(payload.status)) ||
        payload.status === 'FETCH_ERROR' // Handled by offline manager
      ) {
        return next(action);
      }
      
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (payload?.data?.message) {
        if (Array.isArray(payload.data.message)) {
          // NestJS class-validator can return an array of messages
          errorMessage = payload.data.message.join(', ');
        } else {
          errorMessage = payload.data.message;
        }
      }
      
      dispatch(showNotification({ message: errorMessage, severity: 'error' }));
    }
    
    return next(action);
  };