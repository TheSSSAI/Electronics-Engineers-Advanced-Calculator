import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationHistoryController } from './calculation-history.controller';
import { CalculationHistoryService } from './calculation-history.service';
import { CalculationHistory } from './entities/calculation-history.entity';
import { CalculationHistoryRepository } from './repositories/calculation-history.repository';

/**
 * NestJS module for the Calculation History feature.
 * Manages the persistence and retrieval of a user's calculation history.
 *
 * Part of REQ-1-004: Enables persistence of calculation history for user accounts.
 * REQ-1-015: Implements the 'append-only' strategy for history data.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([CalculationHistory, CalculationHistoryRepository]),
  ],
  controllers: [CalculationHistoryController],
  providers: [CalculationHistoryService],
  exports: [CalculationHistoryService], // Exported for potential use in other modules
})
export class CalculationHistoryModule {}