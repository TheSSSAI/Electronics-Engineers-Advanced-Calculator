import { z } from 'zod';
import { userSchema } from '../user/user.schema';

// =================================================================
// Registration
// =================================================================

export const registerRequestSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }).describe('The email address for the new user account.'),
  password: z
    .string()
    .min(12, { message: 'Password must be at least 12 characters long.' })
    .describe('The password for the new user account. Must meet the strength requirements.'),
  termsAccepted: z
    .literal(true, {
      errorMap: () => ({ message: 'You must accept the Terms of Service and Privacy Policy to register.' }),
    })
    .describe('Confirmation that the user has accepted the terms of service and privacy policy.'),
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;

// =================================================================
// Login
// =================================================================

export const loginRequestSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }).describe("The user's email address."),
  password: z.string().min(1, { message: 'Password cannot be empty.' }).describe("The user's password."),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;

// =================================================================
// Authentication Response
// =================================================================

export const authResponseSchema = z.object({
  accessToken: z.string().describe('A JWT access token for authenticating API requests.'),
  refreshToken: z.string().describe('A refresh token to obtain a new access token.'),
  idToken: z.string().describe('A JWT ID token containing user profile information.'),
  user: userSchema.describe('The authenticated user profile data.'),
});

export type AuthResponseDto = z.infer<typeof authResponseSchema>;