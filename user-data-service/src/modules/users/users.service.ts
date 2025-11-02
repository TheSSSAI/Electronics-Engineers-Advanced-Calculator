import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CognitoService } from '../../shared/aws/cognito.service';
import { User } from './entities/user.entity';
import { CustomMode } from '../custom-modes/entities/custom-mode.entity';
import { UserVariable } from '../user-variables/entities/user-variable.entity';
import { CalculationHistory } from '../calculation-history/entities/calculation-history.entity';

/**
 * UsersService provides business logic for user account management.
 * It orchestrates operations between the application database and the external
 * identity provider (AWS Cognito).
 *
 * @requirement REQ-1-004: Implement a user account system for registration, login, and secure data persistence.
 * @requirement REQ-1-031: Provide a user-initiated account deletion feature with a confirmation step, leading to permanent data removal.
 * @requirement REQ-1-061: The account deletion process must ensure that when a user is deleted, all associated records... are also permanently deleted.
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CustomMode)
    private readonly customModesRepository: Repository<CustomMode>,
    @InjectRepository(UserVariable)
    private readonly userVariablesRepository: Repository<UserVariable>,
    @InjectRepository(CalculationHistory)
    private readonly calculationHistoryRepository: Repository<CalculationHistory>,
    private readonly cognitoService: CognitoService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Finds a user by their unique authentication provider ID (e.g., Cognito 'sub' claim).
   * This is a primary method used during the authentication flow to link an identity
   * token to an internal user record.
   * @param authProviderId - The unique ID from the identity provider.
   * @returns The user entity or null if not found.
   */
  async findByAuthProviderId(authProviderId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { authProviderId } });
  }

  /**
   * Finds a user by their internal database UUID.
   * @param id - The UUID of the user.
   * @returns The user entity or null if not found.
   */
  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Permanently deletes a user's account and all associated data from the system.
   * This is a multi-step, transactional process:
   * 1. A database transaction is initiated to delete all user-generated content
   *    (history, variables, custom modes) and the user's own record.
   * 2. If the database transaction succeeds, a call is made to AWS Cognito to
   *    permanently delete the user's identity from the user pool.
   *
   * This implements the "delete-then-notify" pattern for the distributed part of the
   * transaction (Cognito). If the Cognito deletion fails, the error is logged for
   * manual intervention, but the local data remains deleted.
   *
   * @param user - The authenticated User entity to be deleted.
   * @throws InternalServerErrorException if the database transaction fails.
   */
  async deleteMyAccount(user: User): Promise<void> {
    this.logger.log(`Initiating account deletion for user ID: ${user.id}`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.verbose(
        `Deleting associated data for user ID: ${user.id} within a transaction.`,
      );

      // Delete associated data in a specific order to respect foreign key constraints if they weren't set to cascade
      await queryRunner.manager.delete(CalculationHistory, { userId: user.id });
      this.logger.verbose(`Deleted calculation history for user ID: ${user.id}`);

      await queryRunner.manager.delete(UserVariable, { userId: user.id });
      this.logger.verbose(`Deleted user variables for user ID: ${user.id}`);

      await queryRunner.manager.delete(CustomMode, { userId: user.id });
      this.logger.verbose(`Deleted custom modes for user ID: ${user.id}`);

      // Finally, delete the user record itself
      const deleteResult = await queryRunner.manager.delete(User, {
        id: user.id,
      });
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`User with ID ${user.id} not found.`);
      }
      this.logger.verbose(`Deleted user record for user ID: ${user.id}`);

      await queryRunner.commitTransaction();
      this.logger.log(`Database transaction for user ${user.id} deletion committed successfully.`);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Database transaction failed for user ${user.id} deletion. Rolling back.`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to delete user data.');
    } finally {
      await queryRunner.release();
    }

    // After the database transaction is successful, delete the user from Cognito.
    try {
      this.logger.log(`Proceeding to delete user ${user.authProviderId} from Cognito.`);
      await this.cognitoService.deleteUser(user.authProviderId);
      this.logger.log(`Successfully deleted user ${user.authProviderId} from Cognito.`);
    } catch (error) {
      // CRITICAL: If this fails, the user's data is gone from our DB, but their
      // identity still exists in Cognito. They could log in again, creating a new,
      // empty user record. This situation must be monitored and handled manually.
      this.logger.error(
        `CRITICAL: Failed to delete user ${user.authProviderId} from Cognito after successful DB deletion. Manual intervention required.`,
        error.stack,
      );
      // We do not re-throw the error here because the primary deletion was successful.
      // The user's data is gone, which fulfills the core privacy requirement.
    }
  }
}