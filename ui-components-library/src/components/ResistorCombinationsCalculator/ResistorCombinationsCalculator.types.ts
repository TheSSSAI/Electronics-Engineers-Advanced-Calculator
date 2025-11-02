/**
 * Defines the internationalization (i18n) labels for the ResistorCombinationsCalculator component.
 */
export interface ResistorCombinationsCalculatorLabels {
  /**
   * Label for the input field where new resistor values are entered.
   * @example "Resistor Value"
   */
  resistorValueInput: string;

  /**
   * Label for the button to add a new resistor to the list.
   * @example "Add"
   */
  addButton: string;
  
  /**
   * Title for the list of resistors.
   * @example "Resistor List"
   */
  resistorListTitle: string;

  /**
   * Placeholder text shown when the resistor list is empty.
   * @example "Add resistor values to begin."
   */
  emptyListPlaceholder: string;

  /**
   * Label for the button to calculate total series resistance.
   * @example "Calculate Series"
   */
  calculateSeriesButton: string;

  /**
   * Label for the button to calculate total parallel resistance.
   * @example "Calculate Parallel"
   */
  calculateParallelButton: string;

  /**
   * Label for the display of the series resistance result.
   * @example "Series R:"
   */
  seriesResultLabel: string;

  /**
   * Label for the display of the parallel resistance result.
   * @example "Parallel R:"
   */
  parallelResultLabel: string;
  
  /**
    * ARIA label for the delete button for a resistor in the list.
    * The {value} placeholder will be replaced with the resistor's value.
    * @example "Delete resistor {value}"
    */
  deleteAriaLabel: string;
}

/**
 * Props for the ResistorCombinationsCalculator component.
 */
export interface ResistorCombinationsCalculatorProps {
  /**
   * An object containing all the localized strings for the component.
   */
  labels: ResistorCombinationsCalculatorLabels;
}