import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CustomModeBuilder } from './CustomModeBuilder';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles/theme';
import { CustomMode } from '../../types/common.types';

const meta: Meta<typeof CustomModeBuilder> = {
  title: 'Feature/CustomModeBuilder',
  component: CustomModeBuilder,
  parameters: {
    layout: 'fullscreen', // Wizard takes more space
  },
  tags: ['autodocs'],
  argTypes: {
    onSave: { action: 'onSave' },
    onCancel: { action: 'onCancel' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLabels = {
    titleCreate: 'Create Custom Mode',
    titleEdit: 'Edit Custom Mode',
    stepDetails: 'Details',
    stepVariables: 'Variables',
    stepFormulas: 'Formulas',
    modeName: 'Mode Name',
    modeDescription: 'Description (Optional)',
    inputVariables: 'Input Variables',
    outputVariables: 'Output Variables',
    addInput: 'Add Input',
    addOutput: 'Add Output',
    variableName: 'Variable Name',
    unit: 'Unit (Optional)',
    formulas: 'Formulas',
    next: 'Next',
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    confirmCancelTitle: 'Discard Changes?',
    confirmCancelBody: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
    confirm: 'Confirm',
    errors: {
        nameRequired: 'Name is required.',
        nameUnique: 'A mode with this name already exists.',
        varNameRequired: 'Variable name is required.',
        varNameInvalid: 'Name must start with a letter and contain only letters and numbers.',
        varNameUnique: 'Variable names must be unique.',
        varNameReserved: 'This name is a reserved keyword.',
        minOneInput: 'At least one input variable is required.',
        minOneOutput: 'At least one output variable is required.',
        formulaInvalid: 'Formula contains an error.',
    }
};

// US-041
export const CreateMode: Story = {
  name: 'Create New Mode',
  args: {
    labels: defaultLabels,
    onSave: fn(),
    onCancel: fn(),
    isNameUnique: async (name: string) => name !== 'existing_mode',
  },
};

// Story to demonstrate editing
const mockModeToEdit: CustomMode = {
    id: '123',
    name: 'Voltage Divider',
    description: 'Calculates the output voltage of a resistive voltage divider.',
    definition: {
        inputs: [
            { id: 'in1', name: 'Vin', unit: 'V' },
            { id: 'in2', name: 'R1', unit: 'Ω' },
            { id: 'in3', name: 'R2', unit: 'Ω' },
        ],
        outputs: [
            { id: 'out1', name: 'Vout', unit: 'V' },
        ],
        formulas: [
            'Vout = Vin * (R2 / (R1 + R2))',
        ],
    }
};

export const EditMode: Story = {
  name: 'Edit Existing Mode',
  args: {
    ...CreateMode.args,
    modeToEdit: mockModeToEdit,
    isNameUnique: async (name: string) => name === 'Voltage Divider' || name !== 'existing_mode',
  },
};