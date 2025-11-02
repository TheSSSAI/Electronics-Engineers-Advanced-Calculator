import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CustomModesRepository } from './repositories/custom-modes.repository';
import { CreateCustomModeDto } from './dtos/create-custom-mode.dto';
import { CustomMode } from './entities/custom-mode.entity';
import { User } from '../users/entities/user.entity';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

// A simplified schema validation function. In a real application,
// this would use a more robust library like Zod or Ajv.
const validateCustomModeDefinition = (definition: any) => {
  if (
    !definition ||
    typeof definition !== 'object' ||
    !definition.name ||
    !Array.isArray(definition.inputs) ||
    !Array.isArray(definition.outputs) ||
    !Array.isArray(definition.formulas)
  ) {
    throw new BadRequestException('Invalid custom mode definition schema.');
  }
  // US-051 (AC-005) - Security Validation Placeholder
  // In a real implementation, this is where you would invoke the
  // secure AWS Lambda Formula Execution Service for each formula.
  for (const formula of definition.formulas) {
    //
    // e.g., await this.formulaValidationService.validate(formula.expression);
    //
    // For now, we perform a basic check for obviously malicious content.
    if (
      typeof formula.expression !== 'string' ||
      /eval|function|require|import|window|document|process/.test(
        formula.expression,
      )
    ) {
      throw new BadRequestException(
        'Import failed: The formula contains unsupported or insecure functions.',
      );
    }
  }
};

@Injectable()
export class CustomModesService {
  constructor(
    private readonly customModesRepository: CustomModesRepository,
    // @Inject(forwardRef(() => FormulaValidationService))
    // private readonly formulaValidationService: IFormulaValidationService
  ) {}

  /**
   * Creates a new custom mode for a given user.
   * Enforces that the name is unique per user.
   * Implements REQ-1-003, US-041.
   */
  async create(
    createCustomModeDto: CreateCustomModeDto,
    user: User,
  ): Promise<CustomMode> {
    const existingMode = await this.customModesRepository.findOne({
      where: { name: createCustomModeDto.name, userId: user.id },
    });

    if (existingMode) {
      throw new ConflictException(
        `A custom mode with the name "${createCustomModeDto.name}" already exists.`,
      );
    }

    const newMode = this.customModesRepository.create({
      ...createCustomModeDto,
      userId: user.id,
    });

    return this.customModesRepository.save(newMode);
  }

  /**
   * Imports a custom mode from a file definition.
   * Implements REQ-1-008, US-051.
   */
  async import(definition: any, user: User): Promise<CustomMode> {
    // REQ-1-020: Validate JSON schema structure.
    validateCustomModeDefinition(definition);

    let modeName = definition.name;
    let suffix = 1;

    // US-051 (AC-006): Handle name conflicts by appending a number.
    while (
      await this.customModesRepository.findOne({
        where: { name: modeName, userId: user.id },
      })
    ) {
      modeName = `${definition.name} (${suffix++})`;
    }

    const newMode = this.customModesRepository.create({
      name: modeName,
      description: definition.description,
      definition: definition.definition, // The nested JSON object
      userId: user.id,
    });

    return this.customModesRepository.save(newMode);
  }

  /**
   * Finds all custom modes for a given user with pagination.
   * Implements US-046.
   */
  async findAllByUserId(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: CustomMode[]; total: number }> {
    const [data, total] = await this.customModesRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  /**
   * Finds a single custom mode by its ID, ensuring it belongs to the specified user.
   * Implements US-048 (for editing).
   */
  async findOne(id: string, userId: string): Promise<CustomMode> {
    const customMode = await this.customModesRepository.findOne({
      where: { id, userId },
    });

    if (!customMode) {
      throw new NotFoundException(`Custom mode with ID "${id}" not found.`);
    }

    return customMode;
  }

  /**
   * Updates an existing custom mode.
   * Implements US-048.
   */
  async update(
    id: string,
    updateDto: Partial<CreateCustomModeDto>,
    userId: string,
  ): Promise<CustomMode> {
    const customMode = await this.findOne(id, userId); // Ensures ownership and existence

    if (
      updateDto.name &&
      updateDto.name !== customMode.name &&
      (await this.customModesRepository.findOne({
        where: { name: updateDto.name, userId },
      }))
    ) {
      throw new ConflictException(
        `A custom mode with the name "${updateDto.name}" already exists.`,
      );
    }
    
    // US-051 (AC-005) - It's critical to re-validate formulas on update as well.
    if (updateDto.definition) {
        validateCustomModeDefinition({name: updateDto.name, ...updateDto.definition});
    }

    Object.assign(customMode, updateDto);
    return this.customModesRepository.save(customMode);
  }

  /**
   * Deletes a custom mode, ensuring it belongs to the specified user.
   * Implements US-049.
   */
  async delete(id: string, userId: string): Promise<void> {
    const result = await this.customModesRepository.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException(`Custom mode with ID "${id}" not found.`);
    }
  }
}