import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserVariablesRepository } from './repositories/user-variables.repository';
import { UpsertUserVariableDto } from './dtos/upsert-user-variable.dto';
import { UserVariable } from './entities/user-variable.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserVariablesService {
  constructor(
    private readonly userVariablesRepository: UserVariablesRepository,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Finds all variables for a given user.
   * Implements US-022.
   */
  async findAllByUserId(userId: string): Promise<UserVariable[]> {
    return this.userVariablesRepository.find({
      where: { userId },
      order: { name: 'ASC' },
    });
  }

  /**
   * Creates or updates a user variable.
   * Implements the 'last-write-wins' conflict resolution strategy for offline sync.
   * Implements REQ-1-015, US-020, US-055.
   */
  async upsert(
    upsertDto: UpsertUserVariableDto,
    userId: string,
  ): Promise<UserVariable> {
    return this.dataSource.transaction(async (manager) => {
      const repository = manager.withRepository(this.userVariablesRepository);

      // Pessimistic lock to prevent race conditions during the read-modify-write cycle.
      const existingVariable = await repository.findOne({
        where: { name: upsertDto.name, userId },
        lock: { mode: 'pessimistic_write' },
      });

      if (existingVariable) {
        // REQ-1-015: Last-Write-Wins logic
        if (
          upsertDto.clientUpdatedAt &&
          new Date(upsertDto.clientUpdatedAt) <= existingVariable.updatedAt
        ) {
          throw new ConflictException(
            `A newer version of variable "${upsertDto.name}" exists on the server.`,
          );
        }

        existingVariable.value = upsertDto.value;
        return repository.save(existingVariable);
      } else {
        const newVariable = repository.create({
          ...upsertDto,
          userId,
        });
        return repository.save(newVariable);
      }
    });
  }

  /**
   * Deletes a user variable by name.
   * Implements US-023.
   */
  async delete(name: string, userId: string): Promise<void> {
    const result = await this.userVariablesRepository.delete({ name, userId });

    if (result.affected === 0) {
      throw new NotFoundException(`Variable with name "${name}" not found.`);
    }
  }
}