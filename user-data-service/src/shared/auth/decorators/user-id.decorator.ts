import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

/**
 * A custom parameter decorator to extract the user's internal database ID from the request object.
 *
 * @remarks
 * This decorator is designed to be used with routes protected by the `JwtAuthGuard`.
 * The guard is responsible for validating the JWT and attaching the user payload to the request object.
 * The payload, as defined by the `JwtStrategy`, is expected to have a `userId` property.
 *
 * @example
 * ```typescript
 * import { Controller, Get, UseGuards } from '@nestjs/common';
 * import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';
 * import { UserId } from 'src/shared/auth/decorators/user-id.decorator';
 *
 * @Controller('profile')
 * @UseGuards(JwtAuthGuard)
 * export class ProfileController {
 *   @Get()
 *   getProfile(@UserId() userId: string) {
 *     // userId will be the string ID of the authenticated user
 *     return this.profileService.findOne(userId);
 *   }
 * }
 * ```
 *
 * @returns The user's UUID string if found on the request object.
 * @throws {InternalServerErrorException} If the decorator is used on a route that is not
 * protected by a guard which attaches a `user` object with a `userId` property to the request.
 */
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.userId) {
      // This should ideally never happen if the decorator is used with JwtAuthGuard.
      // It indicates a developer error (e.g., forgetting to apply the guard).
      throw new InternalServerErrorException(
        'UserId decorator used without a valid user payload on the request. Ensure JwtAuthGuard is applied.',
      );
    }

    return user.userId;
  },
);