import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';

import { DatabaseModule } from './shared/database/database.module';
import { CacheModule } from './shared/cache/cache.module';
import { AuthModule } from './shared/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CustomModesModule } from './modules/custom-modes/custom-modes.module';
import { UserVariablesModule } from './modules/user-variables/user-variables.module';
import { CalculationHistoryModule } from './modules/calculation-history/calculation-history.module';
import { AwsModule } from './shared/aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: Joi.object({
        // Application
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),

        // PostgreSQL Database
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),

        // JWT Authentication (Cognito)
        JWT_SECRET: Joi.string().required(), // Although Cognito uses JWKS, a secret might be used for other purposes or as a fallback.
        COGNITO_USER_POOL_ID: Joi.string().required(),
        COGNITO_CLIENT_ID: Joi.string().required(),
        COGNITO_REGION: Joi.string().required(),
        COGNITO_AUTHORITY: Joi.string().required(),

        // Redis Cache
        CACHE_HOST: Joi.string().required(),
        CACHE_PORT: Joi.number().required(),
        CACHE_TTL: Joi.number().default(60),

        // Rate Limiting
        THROTTLE_TTL: Joi.number().default(60),
        THROTTLE_LIMIT: Joi.number().default(100),

        // AWS
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_SQS_DATA_EXPORT_QUEUE_URL: Joi.string().required(),
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('THROTTLE_TTL'),
        limit: config.get<number>('THROTTLE_LIMIT'),
      }),
    }),
    DatabaseModule,
    CacheModule,
    AuthModule,
    AwsModule,
    UsersModule,
    CustomModesModule,
    UserVariablesModule,
    CalculationHistoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}