import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { queueRequest } from '../offline/offlineSlice';
import { isNetworkError } from '../offline/utils';

// Define the core base query with authentication headers
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // REQ-1-040: Access to all protected backend API endpoints must be controlled by requiring a valid JWT.
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * A custom base query wrapper that handles:
 * 1. Automatic re-authentication (if a refresh token flow were implemented).
 * 2. Handling of 401 Unauthorized errors by logging the user out.
 * 3. Intercepting network errors to queue requests for offline synchronization.
 * This directly implements the resilience patterns required by REQ-1-014 and the security model of REQ-1-040.
 */
const baseQueryWithReauthAndOffline: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // REQ-1-040: Handle authentication failures. If a 401 is received, the token is invalid/expired.
  if (result.error && result.error.status === 401) {
    // In a full implementation with refresh tokens, we would attempt a token refresh here.
    // For now, as per the current design, we log the user out.
    console.error('Authentication error: 401 Unauthorized. Logging out.');
    api.dispatch(logout());
  } 
  // REQ-1-014: Support offline data modifications by queuing changes locally.
  // This block intercepts failed requests and queues them if it's a network error.
  else if (result.error && isNetworkError(result.error)) {
    console.warn('Network error detected. Queuing request for offline sync.');
    // Don't dispatch for GET requests as they are queries, not mutations.
    // This is a common pattern to avoid queuing up stale data requests.
    const method = typeof args === 'string' ? 'GET' : args.method || 'GET';
    if (method.toUpperCase() !== 'GET') {
      api.dispatch(queueRequest({ args, timestamp: new Date().toISOString() }));
    }
  }

  return result;
};


/**
 * The root API slice.
 * All other API slices will inject their endpoints into this one.
 * It defines the base query and the tags for cache invalidation.
 * This structure allows for a single, centralized place to manage API configuration
 * while keeping feature-specific endpoints in their respective files.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauthAndOffline,
  // Define tag types for caching and invalidation. These correspond to the major data entities.
  // REQ-1-004, US-054, US-055, US-056: These tags will be used to manage caches for user data,
  // history, variables, and custom modes.
  tagTypes: ['User', 'CustomMode', 'UserVariable', 'CalculationHistory'],
  endpoints: builder => ({}), // Endpoints are injected in other files
});