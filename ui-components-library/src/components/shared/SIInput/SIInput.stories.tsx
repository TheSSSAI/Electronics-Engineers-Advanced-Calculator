import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SIInput } from './SIInput';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/theme';
import { Box } from '@mui/material';

const meta: Meta<typeof SIInput> = {
  title: 'Shared/SIInput',
  component: SIInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    unit: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    onValueChange: { action: 'onValueChange' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: 300 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Resistance',
    unit: 'Ω',
    value: '',
    onValueChange: fn(),
  },
};

export const WithValue: Story = {
  args: {
    label: 'Voltage',
    unit: 'V',
    value: '1.2k',
    onValueChange: fn(),
  },
};

export const WithError: Story = {
  args: {
    label: 'Current',
    unit: 'A',
    value: '-5m',
    error: true,
    helperText: 'Current must be a positive value.',
    onValueChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Power',
    unit: 'W',
    value: 'Calculated Value',
    disabled: true,
    onValueChange: fn(),
  },
};

export const ReadOnlyCalculated: Story = {
    name: 'Read-Only (Calculated)',
    args: {
      label: 'Calculated Resistance',
      unit: 'Ω',
      value: '24.5',
      disabled: true,
      readOnly: true, // Specific prop to style it as a result
      onValueChange: fn(),
    },
  };