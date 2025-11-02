import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomModesController } from './custom-modes.controller';
import { CustomModesService } from './custom-modes.service';
import { CustomMode } from './entities/custom-mode.entity';
import { CustomModesRepository } from './repositories/custom-modes.repository';

/**
 * NestJS module for the Custom Modes feature.
 * This module encapsulates all components related to managing user-defined
 * custom calculation modes, including the controller, service, repository, and entity.
 *
 * REQ-1-003: Provides the framework for user-defined calculation modes.
 * REQ-1-059: Defines the database integration for the custom_modes table.
 */
@Module({
  imports: [TypeOrmModule.forFeature([CustomMode, CustomModesRepository])],
  controllers: [CustomModesController],
  providers: [CustomModesService],
  exports: [CustomModesService], // Exported for potential use in other modules (e.g., user deletion)
})
export class CustomModesModule {}