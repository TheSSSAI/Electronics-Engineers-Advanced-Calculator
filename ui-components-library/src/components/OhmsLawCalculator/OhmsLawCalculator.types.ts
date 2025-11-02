/**
 * Defines the internationalization (i18n) labels for the OhmsLawCalculator component.
 * The consuming application is responsible for providing the translated strings.
 */
export interface OhmsLawCalculatorLabels {
  /**
   * Label for the Voltage input field.
   * @example "Voltage"
   */
  voltage: string;

  /**
   * Label for the Current input field.
   * @example "Current"
   */
  current: string;

  /**
   * Label for the Resistance input field.
   * @example "Resistance"
   */
  resistance: string;

  /**
   * Label for the Power input field.
   * @example "Power"
   */
  power: string;

  /**
   * Guidance message shown when fewer than two inputs are provided.
   * @example "Enter any two values to calculate."
   */
  guidance: string;

  /**
   * Label for the button to clear all fields.
   * @example "Clear"
   */
  clear: string;
}

/**
 * Props for the OhmsLawCalculator component.
 */
export interface OhmsLawCalculatorProps {
  /**
   * An object containing all the localized strings for the component.
   */
  labels: OhmsLawCalculatorLabels;
}