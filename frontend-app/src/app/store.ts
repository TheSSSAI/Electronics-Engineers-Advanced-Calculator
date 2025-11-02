import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import { authSlice } from '../features/auth/authSlice';
import { uiSlice } from '../features/ui/uiSlice';
import { offlineSlice } from '../features/offline/offlineSlice';
import { apiErrorMiddleware } from '../features/api/apiErrorMiddleware';
import { appListenerMiddleware } from './listenerMiddleware';

/**
 * Configures the main Redux store for the application.
 *
 * This setup brings together all the feature slices (reducers) and configures the middleware stack.
 * The middleware stack includes:
 * - Default middleware from Redux Toolkit (thunk, immutability check, etc.).
 * - RTK Query middleware for data fetching and caching (`apiSlice.middleware`).
 * - Custom application listener middleware for reactive side effects (`appListenerMiddleware`).
 * - Custom API error handling middleware for displaying global error notifications (`apiErrorMiddleware`).
 *
 * This file is the central hub for the application's state management, aligning with
 * the Centralized State Management pattern specified in the architecture.
 * It fulfills requirements REQ-1-055 by using Redux Toolkit and integrating the API layer.
 */
export const store = configureStore({
  reducer: {
    // Connect the API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Connect feature slices
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    offline: offlineSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(appListenerMiddleware.middleware)
      .concat(apiSlice.middleware)
      .concat(apiErrorMiddleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
// This is a best practice for type-safe interaction with the Redux store.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;