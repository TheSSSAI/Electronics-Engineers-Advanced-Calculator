import { IDBPDatabase } from 'idb';
import { openSyncDb, SyncDB } from './db';
import {
  IOfflineSyncManager,
  QueuedRequest,
  SyncConflictDetail,
  SyncErrorDetail,
  SyncEvent,
} from './types';

const INITIAL_RETRY_DELAY_MS = 1000;
const MAX_RETRY_DELAY_MS = 60000; // 1 minute
const RETRY_BACKOFF_FACTOR = 2;

/**
 * Manages a queue of offline data modifications in IndexedDB and synchronizes
 * them with the backend upon reconnection. Implements REQ-1-014 and REQ-1-015.
 */
export class OfflineSyncManager implements IOfflineSyncManager {
  private readonly dbPromise: Promise<IDBPDatabase<SyncDB>>;
  private readonly apiBaseUrl: string;
  private isOnline: boolean;
  private isSyncing: boolean = false;
  private retryTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private currentRetryDelay: number = INITIAL_RETRY_DELAY_MS;

  constructor(apiBaseUrl: string, dbName: string = 'app-sync-db') {
    if (!apiBaseUrl) {
      throw new Error('OfflineSyncManager: apiBaseUrl is required.');
    }
    this.apiBaseUrl = apiBaseUrl;
    this.dbPromise = openSyncDb(dbName);
    this.isOnline = navigator.onLine;

    this.#setupNetworkListeners();
  }

  /**
   * Adds a request to the offline queue for later synchronization.
   * @param request The API request object to be queued.
   */
  public async queueRequest(request: Omit<QueuedRequest, 'id'>): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.add('sync-queue', request);
      console.log('OfflineSyncManager: Queued request.', request);
    } catch (error) {
      console.error('OfflineSyncManager: Failed to queue request.', error);
      // Optionally dispatch an event for queueing failure
    }
  }

  /**
   * Initiates the synchronization process. This is called automatically on
   * reconnection but can also be triggered manually.
   * @param authToken The optional JWT token for authenticating API requests.
   */
  public async triggerSync(authToken?: string): Promise<void> {
    if (this.isSyncing || !this.isOnline) {
      console.log(
        `OfflineSyncManager: Sync trigger skipped. isSyncing=${this.isSyncing}, isOnline=${this.isOnline}`,
      );
      return;
    }

    this.isSyncing = true;
    this.#clearRetryTimeout();
    this.currentRetryDelay = INITIAL_RETRY_DELAY_MS;
    this.#dispatchEvent('sync:start');
    console.log('OfflineSyncManager: Sync process started.');

    try {
      await this.#processQueue(authToken);
      this.#dispatchEvent('sync:success');
      console.log('OfflineSyncManager: Sync process completed successfully.');
    } catch (error) {
      // Errors during processing (like network loss) are caught here.
      console.warn('OfflineSyncManager: Sync process interrupted.', error);
      if (error instanceof Error && error.message === 'NETWORK_ERROR') {
        // Network was lost during sync, which is an expected scenario.
        // The offline listener will handle re-triggering.
      } else {
        // An unexpected error occurred. Schedule a retry.
        this.#scheduleRetry(authToken);
      }
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sets up event listeners to monitor the browser's online/offline status.
   */
  #setupNetworkListeners(): void {
    window.addEventListener('online', this.#handleOnlineStatusChange);
    window.addEventListener('offline', this.#handleOfflineStatusChange);
  }

  #handleOnlineStatusChange = (): void => {
    console.log('OfflineSyncManager: Network status changed to ONLINE.');
    this.isOnline = true;
    // Automatically trigger sync when connection is restored.
    // The consuming app should provide the token. This is a best-effort attempt.
    this.triggerSync();
  };

  #handleOfflineStatusChange = (): void => {
    console.log('OfflineSyncManager: Network status changed to OFFLINE.');
    this.isOnline = false;
    this.#clearRetryTimeout(); // Stop any pending retries if we go offline
  };

  /**
   * Processes the request queue sequentially.
   * @param authToken The JWT token for authenticating API requests.
   */
  async #processQueue(authToken?: string): Promise<void> {
    const db = await this.dbPromise;
    let cursor = await db.transaction('sync-queue').store.openCursor();

    while (cursor) {
      if (!this.isOnline) {
        throw new Error('NETWORK_ERROR');
      }

      const request = cursor.value;
      try {
        const response = await this.#sendRequest(request, authToken);

        if (response.ok) {
          // Success (2xx)
          await cursor.delete();
          console.log(`OfflineSyncManager: Successfully synced request ID: ${request.id}`);
        } else if (response.status === 409) {
          // Conflict (409) - Last Write Wins, server is authoritative
          console.warn(`OfflineSyncManager: Conflict for request ID: ${request.id}. Server version wins.`);
          const serverData = await response.json();
          this.#dispatchEvent<SyncConflictDetail>('sync:conflict', {
            request,
            serverData,
          });
          await cursor.delete();
        } else if (response.status >= 400 && response.status < 500) {
          // Other client error (4xx) - unrecoverable
          console.error(`OfflineSyncManager: Unrecoverable client error for request ID: ${request.id}. Status: ${response.status}. Deleting request.`);
          const errorBody = await response.json().catch(() => ({}));
          this.#dispatchEvent<SyncErrorDetail>('sync:error', {
            request,
            error: { status: response.status, body: errorBody },
          });
          await cursor.delete();
        } else {
          // Server error (5xx) or other unexpected issue - recoverable
          console.error(`OfflineSyncManager: Server error for request ID: ${request.id}. Status: ${response.status}. Scheduling retry.`);
          throw new Error('SERVER_ERROR');
        }
      } catch (error) {
        // Network error during fetch
        console.error(`OfflineSyncManager: Network error while processing request ID: ${request.id}. Scheduling retry.`, error);
        throw new Error('NETWORK_ERROR');
      }
      cursor = await cursor.continue();
    }
  }

  /**
   * Sends a single queued request to the backend.
   * @param request The queued request object from IndexedDB.
   * @param authToken The JWT token for authentication.
   */
  #sendRequest(request: QueuedRequest, authToken?: string): Promise<Response> {
    const url = `${this.apiBaseUrl}${request.endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return fetch(url, {
      method: request.method,
      headers,
      body: JSON.stringify(request.payload),
    });
  }

  /**
   * Schedules a retry attempt for the synchronization process using exponential backoff.
   * @param authToken The JWT token to use for the retry attempt.
   */
  #scheduleRetry(authToken?: string): void {
    this.#clearRetryTimeout();

    this.retryTimeoutId = setTimeout(() => {
      console.log(`OfflineSyncManager: Retrying sync... (delay: ${this.currentRetryDelay}ms)`);
      this.isSyncing = false; // Allow triggerSync to run again
      this.triggerSync(authToken);
    }, this.currentRetryDelay);

    this.#dispatchEvent('sync:pending_retry', { delay: this.currentRetryDelay });

    // Increase delay for the next potential retry
    this.currentRetryDelay = Math.min(
      this.currentRetryDelay * RETRY_BACKOFF_FACTOR,
      MAX_RETRY_DELAY_MS,
    );
  }

  /**
   * Clears any pending retry timeout.
   */
  #clearRetryTimeout(): void {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
      this.retryTimeoutId = null;
    }
  }

  /**
   * A helper to dispatch custom events for communicating with the main application.
   * @param type The type of the sync event.
   * @param detail The optional payload for the event.
   */
  #dispatchEvent<T>(type: SyncEvent, detail?: T): void {
    window.dispatchEvent(new CustomEvent(type, { detail }));
  }

  /**
   * Cleans up event listeners. Should be called when the application unmounts.
   */
  public cleanup(): void {
    window.removeEventListener('online', this.#handleOnlineStatusChange);
    window.removeEventListener('offline', this.#handleOfflineStatusChange);
    this.#clearRetryTimeout();
    console.log('OfflineSyncManager: Cleaned up network listeners.');
  }
}