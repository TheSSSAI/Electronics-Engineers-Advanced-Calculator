import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { AwsModule } from 'src/shared/aws/aws.module';
import { CustomModesRepository } from '../custom-modes/repositories/custom-modes.repository';
import { UserVariablesRepository } from '../user-variables/repositories/user-variables.repository';
import { CalculationHistoryRepository } from '../calculation-history/repositories/calculation-history.repository';

/**
 * NestJS module for User management.
 * This module is responsible for handling user profile retrieval and account deletion,
 * orchestrating operations across multiple data stores (PostgreSQL and AWS Cognito).
 *
 * REQ-1-031, REQ-1-061: Implements the complex account deletion logic.
 * REQ-1-058: Defines the database integration for the users table.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UsersRepository,
      CustomModesRepository,
      UserVariablesRepository,
      CalculationHistoryRepository,
    ]),
    AwsModule, // Import AwsModule to make CognitoService available for injection
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}