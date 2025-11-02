import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CalculationHistory } from '../entities/calculation-history.entity';
import { AddHistoryDto } from '../dtos/add-history.dto';

@Injectable()
export class CalculationHistoryRepository extends Repository<CalculationHistory> {
  constructor(private dataSource: DataSource) {
    super(CalculationHistory, dataSource.createEntityManager());
  }

  /**
   * Finds all calculation history entries for a specific user, with pagination.
   * Results are ordered by creation date, with the most recent first.
   * @param userId The ID of the user.
   * @param page The page number to retrieve.
   * @param limit The number of items per page.
   * @returns A promise resolving to a tuple containing an array of CalculationHistory entities and the total count.
   */
  async findByUserIdPaginated(
    userId: string,
    page: number,
    limit: number,
  ): Promise<[CalculationHistory[], number]> {
    const skip = (page - 1) * limit;

    return this.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });
  }

  /**
   * Adds a new calculation history entry for a user.
   * @param addHistoryDto The DTO containing the expression and result.
   * @param userId The ID of the user who performed the calculation.
   * @returns A promise resolving to the newly created CalculationHistory entity.
   */
  async addHistory(
    addHistoryDto: AddHistoryDto,
    userId: string,
  ): Promise<CalculationHistory> {
    const newHistoryEntry = this.create({
      ...addHistoryDto,
      userId,
    });

    return this.save(newHistoryEntry);
  }
}