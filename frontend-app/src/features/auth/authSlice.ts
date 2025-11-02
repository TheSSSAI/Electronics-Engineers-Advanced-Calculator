import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Assuming a User DTO is available from a shared contracts library as per architecture.
// This ensures type safety between frontend and backend.
// REQ-1-058 defines the user table, this DTO should reflect that.
export interface User {
  id: string;
  email: string;
  // Other properties like name, roles, etc. might be added later
}

// Defines the shape of the authentication state.
export interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isFirstLogin: boolean; // REQ-1-073: To trigger guided tour for new users.
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  isFirstLogin: false,
};

/**
 * Redux slice for managing user authentication state.
 * This includes the user's profile information, JWT, and authentication status.
 * It is central to implementing REQ-1-004 (User Account System).
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets the user's credentials upon successful login.
     * This action is dispatched after the OAuth 2.0 flow is complete and tokens are obtained.
     * @param state - The current auth state.
     * @param action - The action payload containing the user profile and token.
     */
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string; isFirstLogin?: boolean }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = 'succeeded';
      state.isFirstLogin = action.payload.isFirstLogin ?? false;
    },
    /**
     * Clears the user's credentials upon logout.
     * Resets the auth state to its initial values.
     * @param state - The current auth state.
     */
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.isFirstLogin = false;
    },
    /**
     * Updates the authentication status, e.g., to 'loading' during the auth process.
     * @param state - The current auth state.
     * @param action - The action payload with the new status.
     */
    setAuthStatus(state, action: PayloadAction<AuthState['status']>) {
      state.status = action.payload;
    },
    /**
     * Marks the first-time user tour as completed.
     * This is called after the user finishes or dismisses the guided tour (REQ-1-073).
     * @param state - The current auth state.
     */
    tourCompleted(state) {
        state.isFirstLogin = false;
    }
  },
});

export const { setCredentials, logout, setAuthStatus, tourCompleted } = authSlice.actions;

export default authSlice.reducer;

// Selectors for accessing authentication state in a memoized and efficient way.
export const selectCurrentUser = (state: RootState): User | null => state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean => !!state.auth.token;
export const selectAuthToken = (state: RootState): string | null => state.auth.token;
export const selectAuthStatus = (state: RootState): AuthState['status'] => state.auth.status;
export const selectIsFirstLogin = (state: RootState): boolean => state.auth.isFirstLogin;