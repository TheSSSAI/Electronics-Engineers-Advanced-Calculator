/**
 * @file execute-formula.dto.ts
 * @description Defines the Data Transfer Object (DTO) for the execute formula use case.
 * This class represents the command object in a CQRS-like pattern, encapsulating all
 * necessary data to perform the execution. Validation decorators are used to define the
 * data contract, ensuring that incoming data is well-formed before processing.
 */

import { IsObject, IsString, IsNotEmpty, IsDefined } from 'class-validator';

/**
 * Command DTO for the ExecuteFormulaUseCase. It contains the untrusted formula
 * and the context of variables to be injected into the sandbox.
 */
export class ExecuteFormulaCommand {
  /**
   * The user-defined formula to be executed.
   * @example "pi * radius^2"
   */
  @IsString({ message: 'Formula must be a string.' })
  @IsNotEmpty({ message: 'Formula cannot be empty.' })
  public readonly formula: string;

  /**
   * A key-value map of variable names to their numerical values.
   * These variables will be available in the global scope of the sandbox.
   * @example { "radius": 10 }
   */
  @IsObject({ message: 'Context must be an object.' })
  @IsDefined({ message: 'Context must be provided.' })
  public readonly context: Record<string, number>;

  constructor(formula: string, context: Record<string, number>) {
    this.formula = formula;
    this.context = context;
  }
}