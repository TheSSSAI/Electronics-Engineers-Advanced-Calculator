import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

/**
 * A global module responsible for authentication concerns.
 * It configures JWT handling and provides the JwtStrategy and JwtAuthGuard
 * for use throughout the application.
 *
 * REQ-1-040: This module is central to implementing JWT-based access control.
 * REQ-1-029: Integrates with AWS Cognito via configuration for JWT validation.
 */
@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // The secret is not used for validation when using a JWKS URI,
        // but it's good practice to have a placeholder or a secret for other potential uses.
        // The actual validation is done via the JWKS URI in the JwtStrategy.
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [PassportModule, JwtAuthGuard],
})
export class AuthModule {}