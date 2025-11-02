import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserVariable } from '../entities/user-variable.entity';

@Injectable()
export class UserVariablesRepository extends Repository<UserVariable> {
  constructor(private dataSource: DataSource) {
    super(UserVariable, dataSource.createEntityManager());
  }

  /**
   * Finds all variables for a specific user.
   * @param userId The ID of the user.
   * @returns A promise that resolves to an array of UserVariable entities.
   */
  async findAllByUserId(userId: string): Promise<UserVariable[]> {
    return this.find({
      where: { userId },
      order: { name: 'ASC' },
    });
  }

  /**
   * Finds a single variable by its name for a specific user.
   * This method is crucial for update operations and conflict checks.
   * It can optionally lock the row for a transaction to prevent race conditions.
   * @param userId The ID of the user.
   * @param name The name of the variable.
   * @returns A promise that resolves to the UserVariable entity or null if not found.
   */
  async findByUserIdAndName(
    userId: string,
    name: string,
  ): Promise<UserVariable | null> {
    return this.findOne({
      where: { userId, name },
    });
  }

  /**
   * Creates or updates a user variable (UPSERT).
   * If a variable with the same name for the user already exists, it updates its value.
   * Otherwise, it creates a new variable.
   * @param userId The ID of the user.
   * @param name The name of the variable.
   * @param value The new value for the variable.
   * @returns A promise that resolves to the created or updated UserVariable entity.
   */
  async upsertVariable(
    userId: string,
    name: string,
    value: string,
  ): Promise<UserVariable> {
    const existingVariable = await this.findByUserIdAndName(userId, name);

    if (existingVariable) {
      existingVariable.value = value;
      return this.save(existingVariable);
    } else {
      const newVariable = this.create({
        userId,
        name,
        value,
      });
      return this.save(newVariable);
    }
  }
}