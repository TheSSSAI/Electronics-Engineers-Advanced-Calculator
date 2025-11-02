import { z } from 'zod';
import { baseEntitySchema, idSchema } from '../../shared/api.schema';

// =================================================================
// Main History DTO
// =================================================================

export const calculationHistoryItemSchema = baseEntitySchema.pick({id: true, createdAt: true}).extend({
  userId: idSchema.describe('The ID of the user who owns this history item.'),
  expression: z.string().min(1, 'Expression cannot be empty.').describe('The mathematical expression that was calculated.'),
  result: z.string().min(1, 'Result cannot be empty.').describe('The result of the calculation.'),
});

export type CalculationHistoryItemDto = z.infer<typeof calculationHistoryItemSchema>;

// =================================================================
// Create DTO
// =================================================================

export const createCalculationHistoryItemDtoSchema = calculationHistoryItemSchema.pick({
  expression: true,
  result: true,
});

export type CreateCalculationHistoryItemDto = z.infer<typeof createCalculationHistoryItemDtoSchema>;

// =================================================================
// Offline Sync DTO
// =================================================================

export const syncCalculationHistoryItemSchema = calculationHistoryItemSchema.pick({
  expression: true,
  result: true,
  createdAt: true,
});

export const syncCalculationHistoryRequestSchema = z.object({
  historyItems: z.array(syncCalculationHistoryItemSchema).describe('An array of history items to synchronize.'),
});

export type SyncCalculationHistoryItem = z.infer<typeof syncCalculationHistoryItemSchema>;
export type SyncCalculationHistoryRequestDto = z.infer<typeof syncCalculationHistoryRequestSchema>;