import { z } from 'zod';
import { baseEntitySchema, idSchema } from '../../shared/api.schema';

// =================================================================
// Main Variable DTO
// =================================================================

export const userVariableSchema = baseEntitySchema.extend({
  userId: idSchema.describe('The ID of the user who owns this variable.'),
  name: z
    .string()
    .min(1, 'Variable name cannot be empty.')
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Invalid variable name format.')
    .describe('The unique name of the variable.'),
  value: z.string().describe('The stored value of the variable, as a string representation of a number.'),
});

export type UserVariableDto = z.infer<typeof userVariableSchema>;

// =================================================================
// Create / Update DTO
// =================================================================

export const createOrUpdateVariableDtoSchema = userVariableSchema.pick({
  name: true,
  value: true,
});

export type CreateOrUpdateVariableDto = z.infer<typeof createOrUpdateVariableDtoSchema>;

// =================================================================
// Offline Sync DTO
// =================================================================

export const syncUserVariableItemSchema = userVariableSchema.pick({
  name: true,
  value: true,
  updatedAt: true,
});

export const syncUserVariablesRequestSchema = z.object({
  variables: z.array(syncUserVariableItemSchema).describe('An array of variables to synchronize.'),
});

export type SyncUserVariableItem = z.infer<typeof syncUserVariableItemSchema>;
export type SyncUserVariablesRequestDto = z.infer<typeof syncUserVariablesRequestSchema>;