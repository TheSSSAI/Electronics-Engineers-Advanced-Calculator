import { z } from 'zod';
import { baseEntitySchema } from '../../shared/api.schema';

// =================================================================
// User DTO Schema
// =================================================================

export const userSchema = baseEntitySchema.pick({ id: true }).extend({
  email: z.string().email().describe("The user's unique email address."),
  // Note: Sensitive fields like `authProviderId` or password hashes are deliberately excluded.
});

export type UserDto = z.infer<typeof userSchema>;