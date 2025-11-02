import type { Meta, StoryObj } from '@storybook/react';
import { FiveFiftyFiveTimerDesigner } from './FiveFiftyFiveTimerDesigner';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles/theme';

const meta: Meta<typeof FiveFiftyFiveTimerDesigner> = {
  title: 'Feature/FiveFiftyFiveTimerDesigner',
  component: FiveFiftyFiveTimerDesigner,
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
    title: '555 Timer Designer',
    astable: 'Astable Mode',
    monostable: 'Monostable Mode',
    frequency: 'Frequency',
    dutyCycle: 'Duty Cycle',
    pulseWidth: 'Pulse Width',
    knownComponent: 'Known Component',
    resistorA: 'Resistor RA',
    resistorB: 'Resistor RB',
    resistor: 'Resistor R',
    capacitor: 'Capacitor C',
    calculatedValues: 'Calculated Values',
    clear: 'Clear',
    errors: {
        dutyCycle: 'Duty cycle must be > 50% and < 100%',
        positive: 'Value must be positive.',
    },
    warnings: {
        resistor: 'Warning: This value is outside the typical practical range (1kΩ - 10MΩ).',
        capacitor: 'Warning: This value is outside the typical practical range (100pF - 1000µF).',
    }
};

// Story for US-037
export const AstableMode: Story = {
  name: 'Astable Mode',
  args: {
    labels: defaultLabels,
    initialMode: 'astable',
    initialAstableValues: {
        frequency: '1k',
        dutyCycle: '75',
        knownComponent: 'C',
        rA: '',
        rB: '',
        c: '10n',
    }
  },
};

// Story for US-039
export const MonostableMode: Story = {
  name: 'Monostable Mode',
  args: {
    labels: defaultLabels,
    initialMode: 'monostable',
    initialMonostableValues: {
        pulseWidth: '1.1',
        r: '',
        c: '1u',
    }
  },
};

// Story for US-038
export const AstableWithValidationError: Story = {
    name: 'Astable with Duty Cycle Error',
    args: {
        ...AstableMode.args,
        initialAstableValues: {
            frequency: '1k',
            dutyCycle: '45', // Invalid
            knownComponent: 'C',
            c: '10n',
            rA: '',
            rB: '',
        }
    }
}

// Story for US-040
export const WithPracticalWarning: Story = {
    name: 'With Practical Value Warning',
    args: {
        ...MonostableMode.args,
        initialMonostableValues: {
            pulseWidth: '1s',
            r: '100', // Will result in huge capacitor
            c: '',
        }
    }
}