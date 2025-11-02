import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for adding a new entry to a user's calculation history.
 * This is used for the POST /api/v1/history endpoint as shown in sequence diagram id:320
 * and required by US-054.
 */
export class AddHistoryDto {
  @ApiProperty({
    description: 'The mathematical expression that was calculated.',
    example: '2+2*sin(90)',
    maxLength: 1024,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  expression: string;

  @ApiProperty({
    description: 'The result of the calculation.',
    example: '4',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  result: string;
}