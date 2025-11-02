import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Represents a user-defined variable.
 * This entity maps to the `user_variables` table in the database.
 * A unique constraint is enforced on the combination of user and variable name.
 * @see REQ-1-060
 */
@Entity({ name: 'user_variables' })
@Unique(['userId', 'name'])
export class UserVariable {
  /**
   * The unique identifier for the user variable.
   * @type {string}
   * @example "a1b2c3d4-e5f6-7890-1234-567890abcdef"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The foreign key linking to the user who owns this variable.
   * @type {string}
   */
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  /**
   * The name of the variable. Must be unique per user.
   * @type {string}
   * @example "gravity"
   */
  @Column({ type: 'varchar', length: 255 })
  name: string;

  /**
   * The value of the variable, stored as a string to accommodate
   * both numeric and potentially other types of values in the future.
   * The application layer is responsible for type coercion.
   * @type {string}
   * @example "9.81"
   */
  @Column({ type: 'varchar' })
  value: string;

  /**
   * The timestamp when this variable was created.
   * Automatically set by TypeORM.
   * @type {Date}
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  /**
   * The timestamp when this variable was last updated.
   * This is critical for implementing the "last-write-wins" conflict
   * resolution strategy for offline synchronization.
   * @type {Date}
   * @see REQ-1-015
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  /**
   * The navigation property for the many-to-one relationship with the User entity.
   * `onDelete: 'CASCADE'` ensures that if a user is deleted, all their variables
   * are also automatically deleted, fulfilling REQ-1-061.
   */
  @ManyToOne(() => User, (user) => user.userVariables, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}