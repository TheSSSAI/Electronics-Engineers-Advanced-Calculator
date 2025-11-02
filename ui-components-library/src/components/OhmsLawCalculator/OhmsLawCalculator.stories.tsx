import type { Meta, StoryObj } from '@storybook/react';
import { OhmsLawCalculator } from './OhmsLawCalculator';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const meta: Meta<typeof OhmsLawCalculator> = {
  title: 'Feature/OhmsLawCalculator',
  component: OhmsLawCalculator,
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

// Story based on US-028
export const Default: Story = {
  name: 'Empty State with Guidance',
  args: {
    labels: {
      title: "Ohm's Law & Power",
      voltage: 'Voltage',
      current: 'Current',
      resistance: 'Resistance',
      power: 'Power',
      guidance: 'Enter any two values to calculate.',
      clear: 'Clear',
      errors: {
          positive: 'Value must be positive.',
          nonNegative: 'Value must be non-negative.',
      }
    },
  },
};

// Story based on US-027
export const WithCalculation: Story = {
  name: 'With a Calculation',
  args: {
    ...Default.args,
    initialValues: {
      voltage: '12',
      resistance: '1k',
    },
  },
};

// Story based on US-029
export const WithValidationError: Story = {
  name: 'With a Validation Error',
  args: {
    ...Default.args,
    initialValues: {
      voltage: '12',
      resistance: '-100', // Invalid value
    },
  },
};