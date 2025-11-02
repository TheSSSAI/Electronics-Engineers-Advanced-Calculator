import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVariablesController } from './user-variables.controller';
import { UserVariablesService } from './user-variables.service';
import { UserVariable } from './entities/user-variable.entity';
import { UserVariablesRepository } from './repositories/user-variables.repository';

/**
 * NestJS module for the User Variables feature.
 * Encapsulates all components for managing user-defined variables,
 * including logic for offline sync conflict resolution.
 *
 * REQ-1-024: Allows authenticated users to create, use, and manage named variables.
 * REQ-1-015: Implements the 'last-write-wins' strategy via the service layer.
 * REQ-1-060: Defines the database integration for the user_variables table.
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserVariable, UserVariablesRepository])],
  controllers: [UserVariablesController],
  providers: [UserVariablesService],
  exports: [UserVariablesService], // Exported for potential use in other modules
})
export class UserVariablesModule {}