/**
 * @file Barrel file for the offline-sync module.
 * This file exports the public API of the offline synchronization feature,
 * making it easy for consuming applications to import and use.
 */

export { OfflineSyncManager } from './OfflineSyncManager';
export type {
  IOfflineSyncManager,
  QueuedRequest,
  SyncErrorDetail,
  SyncConflictDetail,
} from './types';