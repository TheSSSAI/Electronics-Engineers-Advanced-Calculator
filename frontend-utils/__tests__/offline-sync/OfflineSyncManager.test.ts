import { vi, describe, it, expect, beforeEach, afterEach, SpyInstance } from 'vitest';
import { openDB } from 'idb';
import { OfflineSyncManager } from '../../src/offline-sync/OfflineSyncManager';
import { QueuedRequest, SyncConflictDetail, SyncErrorDetail } from '../../src/offline-sync/types';

// Mock the db module
vi.mock('../../src/offline-sync/db', () => ({
  setupDB: vi.fn(),
}));
const mockOpenDB = openDB as jest.Mock;
vi.mock('idb');

describe('OfflineSyncManager', () => {
  const API_BASE_URL = 'https://api.test.com';
  let manager: OfflineSyncManager;
  let mockDb: any;
  let fetchSpy: SpyInstance;

  // In-memory representation of our IndexedDB object store
  let requestQueue: (QueuedRequest & { id: number })[] = [];
  let nextId = 1;

  beforeEach(() => {
    // Reset in-memory queue
    requestQueue = [];
    nextId = 1;

    // Deep mock of the idb library's return value
    mockDb = {
      add: vi.fn(async (_storeName, value) => {
        const id = nextId++;
        requestQueue.push({ ...value, id });
        return id;
      }),
      delete: vi.fn(async (_storeName, id) => {
        requestQueue = requestQueue.filter(req => req.id !== id);
      }),
      // A more realistic cursor mock
      transaction: () => ({
        store: {
          openCursor: vi.fn(async function* () {
            for (const item of requestQueue) {
              yield {
                value: item,
                delete: vi.fn(async () => {
                  requestQueue = requestQueue.filter(req => req.id !== item.id);
                }),
                update: vi.fn(async (newValue) => {
                    const index = requestQueue.findIndex(req => req.id === item.id);
                    if (index !== -1) {
                        requestQueue[index] = newValue;
                    }
                }),
              };
            }
          })(),
        },
      }),
      get: vi.fn(async (_storeName, id) => {
        return requestQueue.find(req => req.id === id);
      }),
      update: vi.fn(async (_storeName, value) => {
        const index = requestQueue.findIndex(req => req.id === value.id);
        if (index > -1) {
          requestQueue[index] = value;
        }
      })
    };

    mockOpenDB.mockResolvedValue(mockDb);

    manager = new OfflineSyncManager(API_BASE_URL);

    // Mock global fetch
    fetchSpy = vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should set up the database on construction', () => {
      expect(mockOpenDB).toHaveBeenCalledWith('app-sync-db', 1, expect.any(Object));
    });
  });

  describe('queueRequest', () => {
    it('should add a request to the database', async () => {
      const request: Omit<QueuedRequest, 'id'> = {
        endpoint: '/api/v1/variables',
        method: 'POST',
        payload: { name: 'test', value: 123 },
        timestamp: Date.now(),
      };

      await manager.queueRequest(request);

      expect(mockDb.add).toHaveBeenCalledWith('sync-queue', request);
      expect(requestQueue.length).toBe(1);
      expect(requestQueue[0].payload.name).toBe('test');
    });
  });

  describe('triggerSync', () => {
    const AUTH_TOKEN = 'test-jwt-token';

    it('should do nothing if the queue is empty', async () => {
      await manager.triggerSync(AUTH_TOKEN);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('should process a single pending request successfully', async () => {
      const request: Omit<QueuedRequest, 'id'> = {
        endpoint: '/api/v1/history',
        method: 'POST',
        payload: { expression: '2+2', result: 4 },
        timestamp: Date.now(),
      };
      await manager.queueRequest(request);
      
      fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));
      
      const startEventSpy = vi.fn();
      const successEventSpy = vi.fn();
      window.addEventListener('sync:start', startEventSpy);
      window.addEventListener('sync:success', successEventSpy);

      await manager.triggerSync(AUTH_TOKEN);

      expect(startEventSpy).toHaveBeenCalledOnce();
      expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}${request.endpoint}`, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(request.payload),
      });
      expect(requestQueue.length).toBe(0);
      expect(successEventSpy).toHaveBeenCalledOnce();
    });

    it('should process multiple requests sequentially and clear the queue', async () => {
        await manager.queueRequest({ endpoint: '/req1', method: 'POST', payload: {}, timestamp: Date.now() });
        await manager.queueRequest({ endpoint: '/req2', method: 'PUT', payload: { data: 'update'}, timestamp: Date.now() });

        fetchSpy.mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

        await manager.triggerSync(AUTH_TOKEN);

        expect(fetchSpy).toHaveBeenCalledTimes(2);
        expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/req1`, expect.any(Object));
        expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/req2`, expect.any(Object));
        expect(requestQueue.length).toBe(0);
    });

    it('should handle 409 Conflict, dispatch a conflict event, and remove the request from the queue', async () => {
      const conflictRequest: Omit<QueuedRequest, 'id'> = {
        endpoint: '/api/v1/variables/myVar',
        method: 'PUT',
        payload: { value: 'client-value' },
        timestamp: Date.now(),
      };
      await manager.queueRequest(conflictRequest);

      const serverData = { name: 'myVar', value: 'server-value', updatedAt: new Date().toISOString() };
      fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(serverData), { status: 409 }));
    
      const conflictEventSpy = vi.fn();
      window.addEventListener('sync:conflict', conflictEventSpy);

      await manager.triggerSync(AUTH_TOKEN);

      expect(requestQueue.length).toBe(0);
      expect(conflictEventSpy).toHaveBeenCalledOnce();
      const eventDetail = (conflictEventSpy.mock.calls[0][0] as CustomEvent<SyncConflictDetail>).detail;
      expect(eventDetail.request.endpoint).toBe(conflictRequest.endpoint);
      expect(eventDetail.serverData).toEqual(serverData);
    });
    
    it('should handle unrecoverable 4xx errors, dispatch an error event, and remove the request', async () => {
        const badRequest: Omit<QueuedRequest, 'id'> = {
            endpoint: '/api/v1/variables',
            method: 'POST',
            payload: { invalid_field: 'bad-data' },
            timestamp: Date.now()
        };
        await manager.queueRequest(badRequest);
        
        const errorResponse = { error: "Validation failed" };
        fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify(errorResponse), { status: 400 }));

        const errorEventSpy = vi.fn();
        window.addEventListener('sync:error', errorEventSpy);

        await manager.triggerSync(AUTH_TOKEN);

        expect(requestQueue.length).toBe(0);
        expect(errorEventSpy).toHaveBeenCalledOnce();
        const eventDetail = (errorEventSpy.mock.calls[0][0] as CustomEvent<SyncErrorDetail>).detail;
        expect(eventDetail.request.payload).toEqual(badRequest.payload);
        expect(eventDetail.error.status).toBe(400);
        expect(eventDetail.error.body).toEqual(errorResponse);
    });

    it('should handle server errors (5xx), leave the request in the queue, and update its retry count', async () => {
        const serverErrorRequest: Omit<QueuedRequest, 'id'> = {
            endpoint: '/api/v1/history',
            method: 'POST',
            payload: { data: 'some-data' },
            timestamp: Date.now(),
            retryCount: 0,
        };
        await manager.queueRequest(serverErrorRequest);

        fetchSpy.mockResolvedValueOnce(new Response('Internal Server Error', { status: 503 }));

        await manager.triggerSync(AUTH_TOKEN);
        
        expect(requestQueue.length).toBe(1);
        expect(requestQueue[0].retryCount).toBe(1);
    });

    it('should stop processing the queue after a network error', async () => {
        await manager.queueRequest({ endpoint: '/req1', method: 'POST', payload: {}, timestamp: Date.now() });
        await manager.queueRequest({ endpoint: '/req2', method: 'POST', payload: {}, timestamp: Date.now() });
        
        fetchSpy.mockRejectedValueOnce(new TypeError('Failed to fetch'));
        
        await manager.triggerSync(AUTH_TOKEN);
        
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(requestQueue.length).toBe(2); // Both requests should remain
        expect(requestQueue[0].retryCount).toBe(1);
        expect(requestQueue[1].retryCount).toBe(undefined); // Second request was not processed
    });
    
    it('should automatically trigger sync when window goes online', async () => {
        // This test requires a bit more setup to simulate the event listeners in the constructor
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const triggerSyncSpy = vi.spyOn(OfflineSyncManager.prototype, 'triggerSync');

        // Re-instantiate to ensure constructor logic with spies is run
        new OfflineSyncManager(API_BASE_URL);

        expect(addEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function));
        
        // Find the 'online' callback and invoke it
        const onlineCallback = addEventListenerSpy.mock.calls.find(call => call[0] === 'online')?.[1];
        if (typeof onlineCallback === 'function') {
          onlineCallback({} as Event);
        }

        expect(triggerSyncSpy).toHaveBeenCalled();
        triggerSyncSpy.mockRestore(); // clean up prototype spy
    });
  });
});