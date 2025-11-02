import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
  Matches,
  ArrayMinSize,
} from 'class-validator';

// Per BR-VAR-002: Variable names must start with a letter and can only contain alphanumeric characters.
const VARIABLE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]*$/;

class ModeVariableDto {
  @ApiProperty({
    description: 'The unique name of the variable within the mode.',
    example: 'inputVoltage',
    pattern: '^[a-zA-Z][a-zA-Z0-9]*$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(VARIABLE_NAME_REGEX, {
    message:
      'Variable name must start with a letter and contain only letters and numbers.',
  })
  name: string;

  @ApiProperty({
    description: 'An optional description for the variable.',
    example: 'The input voltage for the divider circuit.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @ApiProperty({
    description: 'An optional unit for the variable.',
    example: 'V',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  unit?: string;
}

class ModeDefinitionDto {
  @ApiProperty({
    description: 'A list of input variables for the custom mode.',
    type: [ModeVariableDto],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one input variable is required.' })
  @ValidateNested({ each: true })
  @Type(() => ModeVariableDto)
  inputs: ModeVariableDto[];

  @ApiProperty({
    description: 'A list of output variables for the custom mode.',
    type: [ModeVariableDto],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one output variable is required.' })
  @ValidateNested({ each: true })
  @Type(() => ModeVariableDto)
  outputs: ModeVariableDto[];

  @ApiProperty({
    description: 'A list of formulas to calculate the output variables.',
    example: ['outputVoltage = inputVoltage * (r2 / (r1 + r2))'],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one formula is required.' })
  @IsString({ each: true })
  formulas: string[];
}

/**
 * Data Transfer Object for creating a new custom calculation mode.
 * This DTO enforces the structure and validation rules for the data
 * sent from the client to create a custom mode, as specified in
 * REQ-1-026 and related business rules.
 */
export class CreateCustomModeDto {
  @ApiProperty({
    description: 'The unique name of the custom mode for the user.',
    example: 'Voltage Divider Calculator',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'An optional description for the custom mode.',
    example: 'Calculates the output voltage of a simple resistive voltage divider.',
    maxLength: 500,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description:
      'The core definition of the custom mode, including its variables and formulas.',
    type: ModeDefinitionDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ModeDefinitionDto)
  definition: ModeDefinitionDto;
}