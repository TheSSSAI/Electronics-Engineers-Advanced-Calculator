import type { Meta, StoryObj } from '@storybook/react';
import { ResistorCombinationsCalculator } from './ResistorCombinationsCalculator';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const meta: Meta<typeof ResistorCombinationsCalculator> = {
  title: 'Feature/ResistorCombinationsCalculator',
  component: ResistorCombinationsCalculator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    title: 'Resistor Combinations',
    addResistor: 'Add Resistor',
    resistorValue: 'Resistor Value',
    resistorList: 'Resistor List',
    calculateSeries: 'Calculate Series',
    calculateParallel: 'Calculate Parallel',
    seriesResult: 'Series Resistance',
    parallelResult: 'Parallel Resistance',
    clearAll: 'Clear All',
    emptyList: 'Add resistors to begin.',
    errors: {
        positive: 'Value must be positive.',
    },
};


// Story based on US-032 (empty state)
export const Empty: Story = {
  name: 'Empty State',
  args: {
    labels: defaultLabels,
  },
};

// Story demonstrating US-030 and US-031
export const WithResistors: Story = {
  name: 'With Resistors and Calculations',
  args: {
    labels: defaultLabels,
    initialResistors: ['1k', '2.2k', '470'],
  },
};

// Story demonstrating US-033
export const WithValidationError: Story = {
    name: 'With Input Validation Error',
    args: {
        labels: defaultLabels,
        initialResistors: ['1k'],
    }
}