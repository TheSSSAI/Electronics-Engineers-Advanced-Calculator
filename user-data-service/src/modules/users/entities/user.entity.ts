import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CustomMode } from '../../custom-modes/entities/custom-mode.entity';
import { UserVariable } from '../../user-variables/entities/user-variable.entity';
import { CalculationHistory } from '../../calculation-history/entities/calculation-history.entity';

/**
 * Represents a user of the application.
 * This entity maps to the `users` table in the database and is the central
 * point for all user-specific data.
 *
 * @Entity
 */
@Entity({ name: 'users' })
export class User {
  /**
   * The unique identifier for the user (UUID).
   * @PrimaryGeneratedColumn
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The unique identifier from the external authentication provider (e.g., Cognito 'sub' claim).
   * This column links the local database user to the identity provider's user record.
   * As per REQ-1-058.
   * @Column
   */
  @Column({ name: 'auth_provider_id', type: 'varchar', unique: true })
  authProviderId: string;

  /**
   * The user's email address. Must be unique.
   * As per REQ-1-058.
   * @Column
   */
  @Column({ type: 'varchar', unique: true })
  email: string;

  /**
   * The timestamp when the user accepted the terms of service.
   * This is a legal requirement for tracking consent, as per REQ-1-075.
   * @Column
   */
  @Column({
    type: 'timestamp with time zone',
    name: 'terms_accepted_at',
    nullable: true,
  })
  termsAcceptedAt: Date | null;

  /**
   * The timestamp when the user record was created.
   * Automatically managed by TypeORM.
   * As per REQ-1-058.
   * @CreateDateColumn
   */
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  /**
   * The timestamp of the last update to the user record.
   * This is crucial for implementing 'last-write-wins' conflict resolution for offline sync.
   * As per REQ-1-015 and REQ-1-058.
   * @UpdateDateColumn
   */
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;

  /**
   * One-to-Many relationship with CustomMode entities.
   * Represents all custom calculation modes created by this user.
   * `cascade: true` ensures that when a user is deleted, all their associated custom modes are also deleted,
   * fulfilling the data removal requirements of REQ-1-061.
   * @OneToMany
   */
  @OneToMany(() => CustomMode, (mode) => mode.user, { cascade: true })
  customModes: CustomMode[];

  /**
   * One-to-Many relationship with UserVariable entities.
   * Represents all variables defined by this user.
   * `cascade: true` ensures that when a user is deleted, all their associated variables are also deleted,
   * fulfilling the data removal requirements of REQ-1-061.
   * @OneToMany
   */
  @OneToMany(() => UserVariable, (variable) => variable.user, {
    cascade: true,
  })
  userVariables: UserVariable[];

  /**
   * One-to-Many relationship with CalculationHistory entities.
   * Represents the calculation history of this user.
   * `cascade: true` ensures that when a user is deleted, their entire calculation history is also deleted,
   * fulfilling the data removal requirements of REQ-1-061.
   * @OneToMany
   */
  @OneToMany(() => CalculationHistory, (history) => history.user, {
    cascade: true,
  })
  calculationHistory: CalculationHistory[];
}