import { Injectable } from '@nestjs/common';
import { CalculationHistoryRepository } from './repositories/calculation-history.repository';
import { AddHistoryDto } from './dtos/add-history.dto';
import { CalculationHistory } from './entities/calculation-history.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CalculationHistoryService {
  constructor(
    private readonly calculationHistoryRepository: CalculationHistoryRepository,
  ) {}

  /**
   * Adds a new calculation to a user's history.
   * This is an append-only operation, as per REQ-1-015.
   * Implements US-012, US-054.
   */
  async add(
    addHistoryDto: AddHistoryDto,
    user: User,
  ): Promise<CalculationHistory> {
    const newHistoryItem = this.calculationHistoryRepository.create({
      ...addHistoryDto,
      userId: user.id,
    });

    return this.calculationHistoryRepository.save(newHistoryItem);
  }

  /**
   * Finds all history items for a given user, with pagination.
   * Implements US-012.
   * Addresses performance NFR REQ-1-042.
   */
  async findAllByUserId(
    userId: string,
    page = 1,
    limit = 50, // A higher default limit for history is reasonable
  ): Promise<{ data: CalculationHistory[]; total: number }> {
    const [data, total] =
      await this.calculationHistoryRepository.findAndCount({
        where: { userId },
        order: { createdAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

    return { data, total };
  }
}