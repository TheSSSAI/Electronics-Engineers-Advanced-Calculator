import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Finds a user by their unique authentication provider ID (e.g., Cognito sub).
   * This is a critical method for linking an authenticated session to an internal user record.
   * @param authProviderId The unique identifier from the authentication provider.
   * @returns A promise that resolves to the User entity or null if not found.
   */
  async findByAuthProviderId(authProviderId: string): Promise<User | null> {
    return this.findOne({
      where: { authProviderId },
    });
  }

  /**
   * Creates a new user in the database.
   * This is typically called during the post-registration flow.
   * @param email The user's email address.
   * @param authProviderId The unique identifier from the authentication provider.
   * @returns A promise that resolves to the newly created User entity.
   */
  async createUser(email: string, authProviderId: string): Promise<User> {
    const user = this.create({
      email,
      authProviderId,
    });
    await this.save(user);
    return user;
  }

  /**
   * Finds a user by their primary key (UUID).
   * @param id The UUID of the user.
   * @returns A promise that resolves to the User entity or null if not found.
   */
  async findById(id: string): Promise<User | null> {
    return this.findOneBy({ id });
  }

  /**
   * Deletes a user by their primary key (UUID).
   * This is part of the account deletion transaction.
   * @param id The UUID of the user to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  async deleteById(id: string): Promise<void> {
    await this.delete({ id });
  }
}