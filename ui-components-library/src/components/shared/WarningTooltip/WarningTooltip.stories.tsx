import type { Meta, StoryObj } from '@storybook/react';
import { WarningTooltip } from './WarningTooltip';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/theme';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof WarningTooltip> = {
  title: 'Shared/WarningTooltip',
  component: WarningTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>Calculated Value: 500 Ω</Typography>
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
    message: 'Warning: This value is outside the typical practical range (1kΩ - 10MΩ).',
  },
};

export const ShortMessage: Story = {
    name: 'With a Short Message',
    args: {
      message: 'Warning: Impractical value.',
    },
  };