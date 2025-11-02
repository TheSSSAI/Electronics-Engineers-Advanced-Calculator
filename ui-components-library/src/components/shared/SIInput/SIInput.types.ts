import { TextFieldProps } from '@mui/material/TextField';

/**
 * Props for the SIInput component.
 * Extends standard MUI TextFieldProps for full API compatibility.
 */
export interface SIInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  /**
   * The current string value of the input field.
   */
  value: string;

  /**
   * Callback function triggered when the input value changes.
   * @param value The new string value from the input.
   */
  onChange: (value: string) => void;

  /**
   * The unit to display as an adornment at the end of the input field (e.g., 'Ω', 'V', 'Hz').
   */
  unit?: string;
  
  /**
   * Optional callback to emit the parsed numerical value, including SI prefix evaluation.
   * This is useful for parent components that need the number, not just the string.
   * @param value The parsed number, or NaN if parsing fails.
   */
  onParsedValueChange?: (value: number) => void;
}