import { z } from 'zod';
import { baseEntitySchema, idSchema } from '../../shared/api.schema';

// =================================================================
// Nested Definition Schemas
// =================================================================

export const customModeVariableSchema = z.object({
  id: idSchema.describe('A unique identifier for this variable within the mode definition.'),
  name: z
    .string()
    .min(1, 'Variable name cannot be empty.')
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Invalid variable name format. Must start with a letter or underscore, and contain only letters, numbers, or underscores.')
    .describe('The unique name of the variable used in formulas.'),
  description: z.string().optional().describe('An optional description for the variable.'),
  unit: z.string().optional().describe('An optional unit for display purposes (e.g., "V", "Ω").'),
});

export const customModeInputVariableSchema = customModeVariableSchema.extend({
  controlType: z.enum(['TextField', 'Slider']).default('TextField').describe('The type of UI control to render for this input.'),
  defaultValue: z.number().optional().describe('The default value for the input field.'),
  sliderConfig: z
    .object({
      min: z.number().describe('The minimum value for the slider.'),
      max: z.number().describe('The maximum value for the slider.'),
      step: z.number().positive('Step must be a positive number.').describe('The increment value for the slider.'),
    })
    .optional()
    .describe('Configuration for the slider control, required if controlType is "Slider".'),
}).refine(data => {
    if (data.controlType === 'Slider') {
        return data.sliderConfig !== undefined && data.sliderConfig.max > data.sliderConfig.min;
    }
    return true;
}, {
    message: 'For sliders, max value must be greater than min value.',
    path: ['sliderConfig'],
});


export const customModeOutputVariableSchema = customModeVariableSchema.pick({
    id: true,
    name: true,
    description: true,
    unit: true,
});

export const customModeFormulaSchema = z.object({
  id: idSchema.describe('A unique identifier for this formula within the mode definition.'),
  outputVarName: z.string().describe('The name of the output variable this formula calculates.'),
  expression: z.string().min(1, 'Formula expression cannot be empty.').describe('The mathematical expression to calculate the output variable.'),
});

export const customModeDefinitionSchema = z.object({
  inputs: z.array(customModeInputVariableSchema).describe('A list of input variables for the custom mode.'),
  outputs: z.array(customModeOutputVariableSchema).describe('A list of output variables for the custom mode.'),
  formulas: z.array(customModeFormulaSchema).describe('A list of formulas that connect inputs to outputs.'),
});

// =================================================================
// Main Custom Mode DTOs
// =================================================================

export const customModeSchema = baseEntitySchema.extend({
  userId: idSchema.describe('The ID of the user who owns this custom mode.'),
  name: z.string().min(3, 'Name must be at least 3 characters.').max(50, 'Name must not exceed 50 characters.').describe('The name of the custom mode.'),
  description: z.string().max(500, 'Description must not exceed 500 characters.').optional().describe('An optional description for the custom mode.'),
  definition: customModeDefinitionSchema,
});

export const createCustomModeDtoSchema = customModeSchema.pick({
  name: true,
  description: true,
  definition: true,
});

export const updateCustomModeDtoSchema = createCustomModeDtoSchema.partial();

// =================================================================
// Export/Import Schema
// =================================================================

export const exportedCustomModeSchema = createCustomModeDtoSchema.extend({
  schemaVersion: z.string().regex(/^\d+\.\d+$/, 'Schema version must be in "major.minor" format.').describe('The version of the custom mode schema for compatibility checks.'),
});

// =================================================================
// Inferred Types
// =================================================================

export type CustomModeVariable = z.infer<typeof customModeVariableSchema>;
export type CustomModeInputVariable = z.infer<typeof customModeInputVariableSchema>;
export type CustomModeOutputVariable = z.infer<typeof customModeOutputVariableSchema>;
export type CustomModeFormula = z.infer<typeof customModeFormulaSchema>;
export type CustomModeDefinition = z.infer<typeof customModeDefinitionSchema>;
export type CustomModeDto = z.infer<typeof customModeSchema>;
export type CreateCustomModeDto = z.infer<typeof createCustomModeDtoSchema>;
export type UpdateCustomModeDto = z.infer<typeof updateCustomModeDtoSchema>;
export type ExportedCustomMode = z.infer<typeof exportedCustomModeSchema>;