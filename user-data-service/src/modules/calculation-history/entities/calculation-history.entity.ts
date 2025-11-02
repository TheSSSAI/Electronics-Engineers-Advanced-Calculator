import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Represents a single entry in a user's calculation history.
 * This entity maps to the `calculation_history` table in the database.
 * This data is treated as append-only for offline synchronization purposes.
 * @see ERD ID 63
 * @see REQ-1-015
 */
@Entity({ name: 'calculation_history' })
export class CalculationHistory {
  /**
   * The unique identifier for the history entry.
   * @type {string}
   * @example "fedcba98-7654-3210-fedc-ba9876543210"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The foreign key linking to the user who performed the calculation.
   * @type {string}
   */
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  /**
   * The mathematical expression entered by the user.
   * @type {string}
   * @example "5 * (10k + 2)"
   */
  @Column({ type: 'text' })
  expression: string;

  /**
   * The result of the calculation, stored as a string to handle
   * numbers, scientific notation, and potential error messages.
   * @type {string}
   * @example "50010"
   */
  @Column({ type: 'varchar' })
  result: string;

  /**
   * The timestamp when this calculation was performed.
   * This is used for ordering the history chronologically.
   * Automatically set by TypeORM upon creation.
   * @type {Date}
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  /**
   * The navigation property for the many-to-one relationship with the User entity.
   * `onDelete: 'CASCADE'` ensures that if a user is deleted, all their calculation
   * history entries are also automatically deleted, fulfilling REQ-1-061.
   */
  @ManyToOne(() => User, (user) => user.calculationHistory, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}