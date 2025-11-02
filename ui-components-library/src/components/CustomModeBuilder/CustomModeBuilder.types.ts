// This DTO would typically be imported from an API contracts library.
// For the purpose of this component library, we define its shape here.
export interface CustomModeVariable {
  id: string;
  name: string;
  unit?: string;
  type: 'input' | 'output';
  // UI control properties, e.g., for sliders
  control?: {
    type: 'slider';
    min: number;
    max: number;
    step: number;
  } | {
    type: 'textfield';
  };
}

export interface CustomModeFormula {
  id: string;
  expression: string;
}

export interface CustomModeDTO {
  id?: string;
  name: string;
  description: string;
  variables: CustomModeVariable[];
  formulas: CustomModeFormula[];
}

/**
 * Defines the internationalization (i18n) labels for the CustomModeBuilder component.
 */
export interface CustomModeBuilderLabels {
  // Wizard Steps
  stepDetails: string;
  stepVariables: string;
  stepFormulas: string;

  // General Buttons
  nextButton: string;
  backButton: string;
  saveButton: string;
  cancelButton: string;
  createButton: string;

  // Step 1: Details
  modeNameLabel: string;
  modeNamePlaceholder: string;
  modeDescriptionLabel: string;
  modeDescriptionPlaceholder: string;
  nameRequiredError: string;
  nameExistsError: string;
  
  // Step 2: Variables
  inputVariablesTitle: string;
  outputVariablesTitle: string;
  addInputButton: string;
  addOutputButton: string;
  variableNameLabel: string;
  variableUnitLabel: string;
  variableNameValidationError: string;
  variableNameUniqueError: string;
  deleteVariableAriaLabel: (name: string) => string;

  // Step 3: Formulas
  formulaEditorTitle: string;
  availableVariablesTitle: string;
  allowedFunctionsTitle: string;
  formulaValidationError: (error: string) => string;

  // Cancel Confirmation
  cancelDialogTitle: string;
  cancelDialogContent: string;
  confirmCancelButton: string;
}

/**
 * Props for the CustomModeBuilder component.
 */
export interface CustomModeBuilderProps {
  /**
   * An object containing all the localized strings for the component.
   */
  labels: CustomModeBuilderLabels;
  
  /**
   * If provided, the wizard will launch in "edit" mode, pre-populated with this data.
   * If null or undefined, the wizard launches in "create" mode with a blank slate.
   */
  modeToEdit?: CustomModeDTO | null;

  /**
   * Callback function invoked when the user successfully completes the wizard and clicks "Save".
   * The consuming application is responsible for persisting the data.
   * The function should return a Promise to allow the wizard to display a loading state.
   * @param mode The complete, validated custom mode definition.
   */
  onSave: (mode: CustomModeDTO) => Promise<void>;

  /**
   * Callback function invoked when the user cancels the wizard.
   */
  onCancel: () => void;

  /**
    * An optional function to check if a mode name is unique.
    * This allows the parent application to perform a real-time check against the server.
    * @param name The name to check.
    * @returns A promise that resolves to true if the name is unique, false otherwise.
    */
  isNameUnique?: (name: string) => Promise<boolean>;
}