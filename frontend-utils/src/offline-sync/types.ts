/**
 * @file Defines the core types, interfaces, and data transfer objects for the Offline Synchronization feature.
 * These definitions establish the public contract for the OfflineSyncManager and the data structures
 * used for queuing and eventing.
 * @see REQ-1-014, REQ-1-015
 */

/**
 * Represents the structure of a request object that is stored in the IndexedDB queue
 * for later synchronization with the backend.
 * This structure contains all necessary information to replay a failed API request.
 * @see REQ-1-014
 */
export type QueuedRequest = {
  /**
   * The auto-incrementing primary key from IndexedDB. This is optional when creating
   * a new request to be queued, as the database will assign it.
   */
  id?: number;

  /**
   * The relative URL of the API endpoint for the request.
   * e.g., '/api/v1/variables'
   */
  endpoint: string;

  /**
   * The HTTP method for the request. Limited to data-modifying verbs.
   */
  method: 'POST' | 'PUT' | 'DELETE';

  /**
   * The body of the request. This should typically conform to a DTO
   * defined in the shared API contracts library.
   */
  payload: any;

  /**
   * A client-generated UTC timestamp (e.g., from `Date.now()`).
   * This is crucial for implementing "last-write-wins" conflict resolution
   * on the backend as specified in REQ-1-015.
   */
  timestamp: number;
};

/**
 * Defines the detail payload for the `sync:error` custom event. This event is dispatched
 * when an unrecoverable error occurs during the synchronization of a single request.
 */
export type SyncErrorDetail = {
  /**
   * The original queued request that failed to sync.
   */
  request: QueuedRequest;

  /**
   * The error object. This can be a network error from `fetch` or a structured
   * representation of an HTTP error response (e.g., 4xx or 5xx).
   */
  error: Error | { status: number; body: any };
};

/**
 * Defines the detail payload for the `sync:conflict` custom event. This event is dispatched
 * when the server responds with an HTTP 409 Conflict, indicating that the client's
 * change was rejected due to a "last-write-wins" scenario as per REQ-1-015.
 */
export type SyncConflictDetail = {
  /**
   * The original queued request that was rejected by the server.
   */
  request: QueuedRequest;

  /**
   * The authoritative data sent back from the server in the 409 response body.
   * The consuming application should use this data to update its state to match
   * the server's source of truth.
   */
  serverData: any;
};

/**
 * Defines the public contract for the OfflineSyncManager. This interface ensures a clear
 * and stable API for the consuming application (the main SPA) to interact with the
 * offline synchronization service.
 */
export interface IOfflineSyncManager {
  /**
   * Adds a data-modifying API request to the local IndexedDB queue. This method should
   * be called by the application's API layer when a request fails due to a network error.
   *
   * @param request The request object to be stored for later synchronization.
   * @returns A promise that resolves when the request is successfully stored in the queue.
   */
  queueRequest(request: Omit<QueuedRequest, 'id'>): Promise<void>;

  /**
   * Manually initiates the synchronization process. This method reads pending requests
   * from the IndexedDB queue and sends them sequentially to the backend. It is typically
   * called automatically when the application detects a restored network connection but is
   * exposed for manual triggering if needed.
   *
   * @param authToken The JWT token for authenticating the API requests. The consuming
   * application is responsible for providing a valid token.
   * @returns A promise that resolves when the sync process has completed (either successfully
   * or because it was paused due to errors).
   */
  triggerSync(authToken: string): Promise<void>;
}