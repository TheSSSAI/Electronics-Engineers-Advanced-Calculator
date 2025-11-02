/**
 * Defines the internationalization (i18n) labels for the FiveFiftyFiveTimerDesigner component.
 */
export interface FiveFiftyFiveTimerDesignerLabels {
  // Tabs
  astableMode: string;
  monostableMode: string;

  // Common
  clearButton: string;

  // Astable Mode
  frequency: string;
  dutyCycle: string;
  knownComponent: string;
  resistorRA: string;
  resistorRB: string;
  capacitorC: string;
  calculatedValues: string;
  dutyCycleValidationError: string;
  
  // Monostable Mode
  pulseWidth: string;
  resistorR: string;
  
  // Warnings
  impracticalWarning: (componentName: string, range: string) => string;
  raWarningRange: string;
  rbWarningRange: string;
  rWarningRange: string;
  cWarningRange: string;
}

/**
 * Props for the FiveFiftyFiveTimerDesigner component.
 */
export interface FiveFiftyFiveTimerDesignerProps {
  /**
   * An object containing all the localized strings for the component.
   */
  labels: FiveFiftyFiveTimerDesignerLabels;
}