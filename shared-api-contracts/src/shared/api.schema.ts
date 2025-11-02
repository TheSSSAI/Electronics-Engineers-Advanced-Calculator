import { z } from 'zod';

// =================================================================
// Reusable Primitives
// =================================================================

export const uuidSchema = z.string().uuid({ message: 'Invalid UUID format.' });
export const idSchema = uuidSchema.describe('A unique identifier for the resource.');

// =================================================================
// Base Entity Schema
// =================================================================

export const baseEntitySchema = z.object({
  id: idSchema,
  createdAt: z.string().datetime().describe('The date and time the resource was created.'),
  updatedAt: z.string().datetime().describe('The date and time the resource was last updated.'),
});

export type BaseEntity = z.infer<typeof baseEntitySchema>;

// =================================================================
// API Error Response Schema (RFC 7807)
// =================================================================

export const apiErrorSchema = z.object({
  statusCode: z.number().int().describe('The HTTP status code.'),
  message: z.union([z.string(), z.array(z.string())]).describe('A human-readable error message or a list of validation errors.'),
  error: z.string().describe('A short, machine-readable error code or name.'),
});

export type ApiErrorDto = z.infer<typeof apiErrorSchema>;

// =================================================================
// Paginated Response Schema
// =================================================================

export const createPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema).describe('An array of items for the current page.'),
    totalItems: z.number().int().min(0).describe('The total number of items available.'),
    currentPage: z.number().int().min(1).describe('The current page number.'),
    totalPages: z.number().int().min(0).describe('The total number of pages available.'),
    itemsPerPage: z.number().int().min(1).describe('The number of items per page.'),
  });

// Example of how to create a paginated type
// const paginatedUserSchema = createPaginatedResponseSchema(userSchema);
// export type PaginatedUserDto = z.infer<typeof paginatedUserSchema>;