import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UsersRepository } from '../../../modules/users/repositories/users.repository';
import { User } from '../../../modules/users/entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  // Add other claims from your Cognito JWT token as needed
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: configService.get<string>('AWS_COGNITO_CLIENT_ID'),
      issuer: `https://${configService.get<string>(
        'AWS_COGNITO_USER_POOL_DOMAIN',
      )}`,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get<string>(
          'AWS_COGNITO_USER_POOL_DOMAIN',
        )}/.well-known/jwks.json`,
      }),
    });
  }

  /**
   * This method is called by the Passport framework after a token has been
   * successfully validated against the JWKS. The payload is the decoded JWT.
   * Its purpose is to link the authenticated identity from the token (Cognito user)
   * to our application's internal user record in the database.
   * @param payload The decoded JWT payload.
   * @returns The application's User entity.
   * @throws UnauthorizedException if no corresponding user is found in the database.
   */
  async validate(payload: JwtPayload): Promise<User> {
    const authProviderId = payload.sub;

    if (!authProviderId) {
      throw new UnauthorizedException('JWT payload missing subject claim.');
    }

    // Find the user in our database that corresponds to the Cognito user ID (sub).
    const user = await this.usersRepository.findByAuthProviderId(
      authProviderId,
    );

    if (!user) {
      // This case handles a valid JWT for a user that has been deleted from our database.
      // We must deny access.
      throw new UnauthorizedException(
        'User associated with this token not found.',
      );
    }

    // The returned user object will be attached to the request object as `req.user`.
    return user;
  }
}