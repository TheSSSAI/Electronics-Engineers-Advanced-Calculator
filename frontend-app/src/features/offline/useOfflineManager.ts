import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// Assuming OfflineSyncManager is provided by an external library as per integration design
// For demonstration, we'll define a placeholder class shape.
// import { OfflineSyncManager, SyncStatus } from '@calculator/frontend-utils';
import { useAppDispatch } from '../../app/store';
import { selectAuthToken } from '../auth/authSlice';
import { setSyncStatus, SyncStatus } from './offlineSlice';

// --- Placeholder for external library type ---
// In a real project, this would be imported from '@calculator/frontend-utils'
type EventMap = {
  'sync:start': () => void;
  'sync:success': () => void;
  'sync:error': (error: Error) => void;
};
class OfflineSyncManager {
  constructor(config: { apiBaseUrl: string }) {
    console.log('OfflineSyncManager initialized with config:', config);
  }
  setAuthToken(token: string | null) {
    console.log('OfflineSyncManager: Auth token updated.');
  }
  addEventListener<K extends keyof EventMap>(type: K, listener: EventMap[K]): void {
     console.log(`OfflineSyncManager: Added listener for ${type}`);
  }
  removeEventListener<K extends keyof EventMap>(type: K, listener: EventMap[K]): void {
     console.log(`OfflineSyncManager: Removed listener for ${type}`);
  }
}
// --- End Placeholder ---

/**
 * A React hook to manage the lifecycle of the OfflineSyncManager.
 * It initializes the manager on application startup, keeps it updated with the
 * current authentication token, and listens for sync events to update the global UI state.
 *
 * This hook is designed to be called ONCE in the root application component (App.tsx).
 * It directly supports the implementation of REQ-1-014.
 */
export const useOfflineManager = () => {
  const dispatch = useAppDispatch();
  const authToken = useSelector(selectAuthToken);
  const managerRef = useRef<OfflineSyncManager | null>(null);

  // Initialize the OfflineSyncManager once on component mount
  useEffect(() => {
    // Prevent initialization during server-side rendering or if already initialized
    if (typeof window === 'undefined' || managerRef.current) {
      return;
    }
    
    const manager = new OfflineSyncManager({
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    });
    managerRef.current = manager;

    const handleSyncStart = () => dispatch(setSyncStatus(SyncStatus.SYNCING));
    const handleSyncSuccess = () => dispatch(setSyncStatus(SyncStatus.SUCCESS));
    const handleSyncError = (error: Error) => {
      console.error('Offline sync failed:', error);
      dispatch(setSyncStatus(SyncStatus.FAILED));
    };

    // Subscribe to events from the manager to update Redux state
    manager.addEventListener('sync:start', handleSyncStart);
    manager.addEventListener('sync:success', handleSyncSuccess);
    manager.addEventListener('sync:error', handleSyncError);

    // Initial sync status
    dispatch(setSyncStatus(SyncStatus.IDLE));

    // Cleanup listeners on component unmount
    return () => {
      if (managerRef.current) {
        managerRef.current.removeEventListener('sync:start', handleSyncStart);
        managerRef.current.removeEventListener('sync:success', handleSyncSuccess);
        managerRef.current.removeEventListener('sync:error', handleSyncError);
        managerRef.current = null;
      }
    };
  }, [dispatch]);

  // Effect to keep the manager's auth token in sync with the Redux state
  useEffect(() => {
    if (managerRef.current) {
      managerRef.current.setAuthToken(authToken);
    }
  }, [authToken]);

  // This hook has no return value as it's purely for side effects.
};