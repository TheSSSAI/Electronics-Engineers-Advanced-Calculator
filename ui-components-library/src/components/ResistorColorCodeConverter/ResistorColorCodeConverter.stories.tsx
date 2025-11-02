import type { Meta, StoryObj } from '@storybook/react';
import { ResistorColorCodeConverter } from './ResistorColorCodeConverter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const meta: Meta<typeof ResistorColorCodeConverter> = {
  title: 'Feature/ResistorColorCodeConverter',
  component: ResistorColorCodeConverter,
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
    title: "Resistor Color Code",
    colorToValue: "Color to Value",
    valueToColor: "Value to Color",
    bandCount: "Number of Bands",
    resistance: "Resistance",
    tolerance: "Tolerance",
    tempCo: "Temp. Coefficient",
    band: "Band",
    multiplier: "Multiplier",
    nearestValue: "Nearest standard value:",
};

// Story for US-036
export const ColorToValue: Story = {
  name: 'Color to Value Mode',
  args: {
    labels: defaultLabels,
    initialMode: 'color-to-value',
  },
};

// Story for US-034
export const ValueToColor: Story = {
  name: 'Value to Color Mode',
  args: {
    labels: defaultLabels,
    initialMode: 'value-to-color',
  },
};

// Story for US-035
export const ValueToColorWithSuggestion: Story = {
    name: 'Value to Color with Suggestion',
    args: {
      labels: defaultLabels,
      initialMode: 'value-to-color',
      initialResistance: '480', // non-standard value
      initialTolerance: 5,
    },
  };