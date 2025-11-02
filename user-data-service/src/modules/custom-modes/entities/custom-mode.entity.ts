import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Represents the schema for a user-defined custom calculation mode.
 * This entity maps to the `custom_modes` table in the database.
 * @see REQ-1-059
 */
@Entity({ name: 'custom_modes' })
export class CustomMode {
  /**
   * The unique identifier for the custom mode.
   * @type {string}
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The foreign key linking to the user who owns this custom mode.
   * This ensures that custom modes are always associated with a user.
   * @type {string}
   */
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  /**
   * The user-friendly name of the custom mode.
   * @type {string}
   * @example "Ohm's Law Calculator"
   */
  @Column({ type: 'varchar', length: 255 })
  name: string;

  /**
   * An optional, longer description of what the custom mode does.
   * @type {string}
   * @example "A simple calculator to solve for V, I, R, or P given two inputs."
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * The core definition of the custom mode, stored as a JSONB object.
   * This includes inputs, outputs, formulas, and UI control types.
   * Using JSONB allows for flexible, schema-less storage and efficient querying.
   * @type {object}
   * @see REQ-1-026
   * @see REQ-1-083
   */
  @Column({ type: 'jsonb' })
  definition: object;

  /**
   * The timestamp when this custom mode was created.
   * Automatically set by TypeORM.
   * @type {Date}
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  /**
   * The timestamp when this custom mode was last updated.
   * Automatically set by TypeORM on every update.
   * @type {Date}
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  /**
   * The navigation property for the many-to-one relationship with the User entity.
   * This allows for loading the owner User object along with the custom mode.
   * `onDelete: 'CASCADE'` ensures that if a user is deleted, all their custom modes
   * are also automatically deleted, fulfilling REQ-1-061.
   */
  @ManyToOne(() => User, (user) => user.customModes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}