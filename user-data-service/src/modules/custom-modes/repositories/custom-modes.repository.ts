import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomMode } from '../entities/custom-mode.entity';
import { CreateCustomModeDto } from '../dtos/create-custom-mode.dto';

@Injectable()
export class CustomModesRepository extends Repository<CustomMode> {
  constructor(private dataSource: DataSource) {
    super(CustomMode, dataSource.createEntityManager());
  }

  /**
   * Finds a custom mode by its ID, but only if it belongs to the specified user.
   * Ensures data isolation between users.
   * @param id The ID of the custom mode.
   * @param userId The ID of the user who must own the mode.
   * @returns A promise resolving to the CustomMode entity or null if not found or not owned by the user.
   */
  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<CustomMode | null> {
    return this.findOne({ where: { id, userId } });
  }

  /**
   * Finds all custom modes belonging to a specific user, with pagination.
   * @param userId The ID of the user.
   * @param page The page number to retrieve.
   * @param limit The number of items per page.
   * @returns A promise resolving to an array of CustomMode entities.
   */
  async findByUserIdPaginated(
    userId: string,
    page: number,
    limit: number,
  ): Promise<[CustomMode[], number]> {
    const skip = (page - 1) * limit;
    return this.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });
  }

  /**
   * Checks if a custom mode with a given name already exists for a specific user (case-insensitive).
   * Used to enforce the unique name constraint per user (BR-CM-001).
   * @param name The name of the custom mode to check.
   * @param userId The ID of the user.
   * @param excludeId Optional. An ID to exclude from the search, used when updating an existing mode.
   * @returns A promise resolving to the existing CustomMode or null if the name is available.
   */
  async findByNameForUser(
    name: string,
    userId: string,
    excludeId?: string,
  ): Promise<CustomMode | null> {
    const queryBuilder = this.createQueryBuilder('customMode')
      .where('customMode.userId = :userId', { userId })
      .andWhere('LOWER(customMode.name) = LOWER(:name)', { name });

    if (excludeId) {
      queryBuilder.andWhere('customMode.id != :excludeId', { excludeId });
    }

    return queryBuilder.getOne();
  }

  /**
   * Creates a new custom mode for a user.
   * @param createDto The DTO containing the mode's data.
   * @param userId The ID of the user creating the mode.
   * @returns A promise resolving to the newly created CustomMode entity.
   */
  async createCustomMode(
    createDto: CreateCustomModeDto,
    userId: string,
  ): Promise<CustomMode> {
    const newMode = this.create({
      ...createDto,
      userId,
    });
    return this.save(newMode);
  }
}