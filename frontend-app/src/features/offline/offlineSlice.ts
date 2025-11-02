import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type SyncStatus = 'idle' | 'syncing' | 'succeeded' | 'failed';

export interface OfflineState {
  isOnline: boolean;
  syncStatus: SyncStatus;
  pendingActionCount: number;
}

const initialState: OfflineState = {
  isOnline: navigator.onLine, // Initial state based on browser API, but will be updated by a more robust check.
  syncStatus: 'idle',
  pendingActionCount: 0,
};

/**
 * Redux slice for managing the UI state related to offline capabilities and data synchronization.
 * This slice does not handle the sync logic itself but reflects its status to the user interface.
 * This is a key part of implementing REQ-1-014.
 */
const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    /**
     * Updates the application's perceived online status.
     * This should be dispatched by a reliable network status detector.
     * @param state - The current offline state.
     * @param action - The action payload indicating if the app is online.
     */
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    /**
     * Updates the status of the background data synchronization process.
     * This allows the UI to show indicators like "Syncing..." or "All changes saved."
     * @param state - The current offline state.
     * @param action - The action payload with the new sync status.
     */
    setSyncStatus(state, action: PayloadAction<SyncStatus>) {
      state.syncStatus = action.payload;
    },
    /**
     * Updates the count of pending actions in the offline queue.
     * Useful for displaying a badge or indicator to the user.
     * @param state - The current offline state.
     * @param action - The action payload with the new count.
     */
    setPendingActionCount(state, action: PayloadAction<number>) {
      state.pendingActionCount = action.payload;
    },
  },
});

export const { setOnlineStatus, setSyncStatus, setPendingActionCount } = offlineSlice.actions;

export default offlineSlice.reducer;

// Selectors for accessing offline-related state.
export const selectIsOnline = (state: RootState): boolean => state.offline.isOnline;
export const selectSyncStatus = (state: RootState): SyncStatus => state.offline.syncStatus;
export const selectPendingActionCount = (state: RootState): number =>
  state.offline.pendingActionCount;