import type { Meta, StoryObj } from '@storybook/react';
import { GuidanceMessage } from './GuidanceMessage';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/theme';
import { Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const meta: Meta<typeof GuidanceMessage> = {
  title: 'Shared/GuidanceMessage',
  component: GuidanceMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    show: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: 400, textAlign: 'center' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultVisible: Story = {
  name: 'Visible',
  args: {
    message: 'Please enter values in any two fields to calculate the others.',
    show: true,
  },
};

export const WithCustomIcon: Story = {
    name: 'With Custom Icon',
    args: {
      message: 'This is an informational message with a custom icon.',
      show: true,
      icon: <InfoOutlinedIcon fontSize="small" />,
    },
  };

export const Hidden: Story = {
  args: {
    message: 'This message should not be visible.',
    show: false,
  },
};