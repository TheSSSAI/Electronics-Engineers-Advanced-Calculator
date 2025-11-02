import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsDateString } from 'class-validator';

// Per BR-VAR-002 and BR-VAR-003: Variable names must be valid and not reserved.
// This regex enforces starting with a letter and containing only alphanumeric chars.
// The reserved keyword check will be handled in the service layer as it's more complex.
const VARIABLE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;

/**
 * Data Transfer Object for creating or updating a user-defined variable.
 * It includes the client-side timestamp required for implementing the
 * 'last-write-wins' conflict resolution strategy as specified in REQ-1-015.
 */
export class UpsertUserVariableDto {
  @ApiProperty({
    description: 'The name of the variable.',
    example: 'my_resistance',
    pattern: '^[a-zA-Z][a-zA-Z0-9_]*$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(VARIABLE_NAME_REGEX, {
    message:
      'Variable name must start with a letter and contain only letters, numbers, and underscores.',
  })
  name: string;

  @ApiProperty({
    description: 'The value to assign to the variable. Can be a number or an expression.',
    example: '4700',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description:
      "The ISO 8601 timestamp from the client when the change was made. Used for 'last-write-wins' conflict resolution during offline sync.",
    example: '2024-05-21T10:00:00.000Z',
  })
  @IsDateString()
  clientTimestamp: string;
}