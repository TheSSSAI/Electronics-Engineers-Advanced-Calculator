import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface UIState {
  isSidebarOpen: boolean;
  isHelpModalOpen: boolean;
  notifications: Notification[];
  angleMode: 'DEG' | 'RAD' | 'GRAD'; // REQ-1-021, US-007, US-008
}

const initialState: UIState = {
  isSidebarOpen: false,
  isHelpModalOpen: false,
  notifications: [],
  angleMode: 'DEG', // Default angle mode as per US-008
};

/**
 * Redux slice for managing global UI state.
 * This includes state for modals, sidebars, notifications, and other cross-cutting UI concerns.
 * Supports REQ-1-025 (Help System), REQ-1-005 (Responsive SPA), and general UI feedback.
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Toggles the visibility of the main sidebar, typically for mobile view.
     * @param state - The current UI state.
     */
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    /**
     * Sets the visibility state of the in-app help modal (REQ-1-025).
     * @param state - The current UI state.
     * @param action - The action payload indicating if the modal should be open.
     */
    setHelpModalOpen(state, action: PayloadAction<boolean>) {
      state.isHelpModalOpen = action.payload;
    },
    /**
     * Adds a new notification (toast) to the UI.
     * @param state - The current UI state.
     * @param action - The action payload containing the notification details.
     */
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      const id = new Date().getTime().toString() + Math.random().toString();
      state.notifications.push({ id, ...action.payload });
    },
    /**
     * Removes a notification from the UI, identified by its ID.
     * @param state - The current UI state.
     * @param action - The action payload containing the ID of the notification to remove.
     */
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
    /**
     * Sets the calculator's angle mode (REQ-1-021).
     * @param state - The current UI state.
     * @param action - The action payload containing the new angle mode.
     */
    setAngleMode(state, action: PayloadAction<UIState['angleMode']>) {
        state.angleMode = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setHelpModalOpen,
  addNotification,
  removeNotification,
  setAngleMode,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors for accessing UI state.
export const selectIsSidebarOpen = (state: RootState): boolean => state.ui.isSidebarOpen;
export const selectIsHelpModalOpen = (state: RootState): boolean => state.ui.isHelpModalOpen;
export const selectNotifications = (state: RootState): Notification[] => state.ui.notifications;
export const selectAngleMode = (state: RootState): UIState['angleMode'] => state.ui.angleMode;