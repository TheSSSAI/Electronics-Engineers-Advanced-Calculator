import { ColorCode, ResistorBandCount } from '../../types/electronics.types';

/**
 * Defines the internationalization (i18n) labels for the ResistorColorCodeConverter component.
 */
export interface ResistorColorCodeConverterLabels {
  // Tabs
  colorToValueTab: string;
  valueToColorTab: string;

  // Common
  bandCount: string;
  bands: (count: number) => string;
  resistance: string;
  tolerance: string;
  tempCoefficient: string;
  
  // Color to Value specific
  bandLabel: (index: number) => string; // e.g. "Band 1"
  multiplierBand: string;
  toleranceBand: string;
  tempCoBand: string;

  // Value to Color specific
  clearButton: string;
  suggestion: string;
  
  // Color names
  colors: Record<ColorCode, string>;
}

/**
 * Props for the ResistorColorCodeConverter component.
 */
export interface ResistorColorCodeConverterProps {
  /**
   * An object containing all the localized strings for the component.
   */
  labels: ResistorColorCodeConverterLabels;
}