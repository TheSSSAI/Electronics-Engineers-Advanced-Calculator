import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { QueuedRequest } from './types';

const DB_NAME = 'app-sync-db';
const DB_VERSION = 1;
const STORE_NAME = 'request_queue';

/**
 * Defines the schema for the IndexedDB database used for offline synchronization.
 * This ensures type-safe interactions with the 'idb' library.
 *
 * @interface SyncDB
 * @extends {DBSchema}
 */
export interface SyncDB extends DBSchema {
  [STORE_NAME]: {
    key: number;
    value: QueuedRequest;
    indexes: { timestamp: number };
  };
}

/**
 * Opens and initializes the IndexedDB database for the offline sync manager.
 * It handles schema creation and version upgrades.
 *
 * This function encapsulates the `idb.openDB` call, providing a single point
 * of configuration for the database schema.
 *
 * @returns {Promise<IDBPDatabase<SyncDB>>} A promise that resolves with the database instance.
 */
export const openSyncDb = (): Promise<IDBPDatabase<SyncDB>> => {
  return openDB<SyncDB>(DB_NAME, DB_VERSION, {
    /**
     * This callback is executed only when the database version changes.
     * It's used to create or modify the database schema.
     * @param {IDBPDatabase<SyncDB>} db The database instance.
     * @param {number} oldVersion The previous version of the database.
     * @param {number | null} newVersion The new version of the database.
     * @param {IDBTransaction} transaction The upgrade transaction.
     */
    upgrade(db, oldVersion) {
      // Logic to create the initial schema or upgrade from previous versions.
      if (oldVersion < 1) {
        // Create the object store for the request queue.
        // The 'id' property of the object will be the key.
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });

        // Create an index on the 'timestamp' property for potential future
        // querying or ordering needs.
        store.createIndex('timestamp', 'timestamp');
      }
      // Future upgrade logic can be added here with `if (oldVersion < 2)` etc.
    },
  });
};