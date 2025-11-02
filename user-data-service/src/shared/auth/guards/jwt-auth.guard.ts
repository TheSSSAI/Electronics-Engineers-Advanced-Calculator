import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * A custom authentication guard that leverages the 'jwt' strategy defined in JwtStrategy.
 * This guard is responsible for protecting endpoints by ensuring a valid JWT is present
 * in the request's Authorization header.
 *
 * It extends the base AuthGuard from @nestjs/passport, which automatically invokes the
 * configured strategy's logic (in this case, JwtStrategy).
 *
 * @see JwtStrategy - The strategy that contains the actual JWT validation logic.
 *
 * This guard is applied to controllers or specific routes using the `@UseGuards(JwtAuthGuard)` decorator.
 *
 * @requirement REQ-1-040: Access to all protected backend API endpoints must be controlled by a valid JWT.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  /**
   * Overrides the canActivate method to add logging. The core authentication logic
   * is still handled by the parent AuthGuard's implementation which calls the JwtStrategy.
   *
   * @param context - The execution context of the current request.
   * @returns A boolean or a Promise/Observable resolving to a boolean, indicating if the request is authorized.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Custom logic can be added here before the strategy is executed.
    // For now, we'll just log the activation attempt and delegate to the superclass.
    // this.logger.verbose('JwtAuthGuard activated.');
    return super.canActivate(context);
  }

  /**
   * Overrides the handleRequest method to customize the user object attached to the request
   * or to throw a custom exception upon authentication failure.
   *
   * The default implementation simply returns the user object on success or throws an
   * UnauthorizedException on failure. This override provides a hook for more specific error
   * handling or logging.
   *
   * @param err - An error object from the Passport strategy, if any.
   * @param user - The user object returned by the Passport strategy's validate method.
   * @param info - Additional information or error details from the Passport strategy.
   * @returns The authenticated user object.
   * @throws UnauthorizedException if authentication fails for any reason.
   */
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.warn(`Authentication failed: ${info?.message || err?.message}`);
      throw (
        err ||
        new UnauthorizedException(
          'Access denied. Please provide a valid authentication token.',
        )
      );
    }
    // The user object here is the one returned from JwtStrategy's validate method,
    // which includes the full User entity.
    return user;
  }
}