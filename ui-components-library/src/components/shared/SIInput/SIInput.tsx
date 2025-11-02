import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { parseWithSIPrefix } from '../../../utils/si-prefix-parser';
import { SIInputProps } from './SIInput.types';

/**
 * A specialized text input component that understands and parses numbers with SI prefixes.
 * It is a controlled component, managing its internal string state while exposing a numeric value
 * to its parent component.
 *
 * This component is crucial for user stories like US-014, US-027, US-034, etc., where users
 * need to enter engineering values efficiently.
 */
export const SIInput = forwardRef<HTMLInputElement, SIInputProps>(
  ({ value, onChange, label, unit, error, helperText, disabled, ...rest }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>('');
    const [internalError, setInternalError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose the underlying input element's ref to the parent
    useImperativeHandle(ref, () => inputRef.current!);

    // Sync internal state when the external `value` prop changes.
    // This handles programmatic updates from the parent component.
    useEffect(() => {
      if (value === null || value === undefined) {
        setDisplayValue('');
      } else if (typeof value === 'number') {
        // Avoid updating if the display value already parses to the same number,
        // which prevents cursor jumping during user input.
        try {
          const parsedDisplay = parseWithSIPrefix(displayValue);
          if (parsedDisplay !== value) {
            setDisplayValue(value.toString());
          }
        } catch (e) {
          setDisplayValue(value.toString());
        }
      }
      // When the external value changes, we clear any transient internal parsing errors.
      setInternalError(null);
    }, [value, displayValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDisplayValue = event.target.value;
      setDisplayValue(newDisplayValue);
      setInternalError(null); // Clear internal error as user types
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const trimmedValue = event.target.value.trim();
      if (trimmedValue === '') {
        // If the field is cleared, propagate null to the parent.
        if (value !== null) {
          onChange(null);
        }
        setInternalError(null);
        return;
      }
      
      try {
        const numericValue = parseWithSIPrefix(trimmedValue);
        // Propagate the change only if the parsed value is different from the current prop value.
        if (numericValue !== value) {
          onChange(numericValue);
        }
        setInternalError(null);
      } catch (e) {
        // If parsing fails, show an internal error message and inform parent of invalid state.
        if (e instanceof Error) {
            setInternalError(e.message);
        } else {
            setInternalError('Invalid number format.');
        }
        // It's often useful to propagate null for an invalid entry
        if (value !== null) {
          onChange(null);
        }
      }
    };
    
    const finalError = !!error || !!internalError;
    const finalHelperText = internalError || helperText;

    return (
      <TextField
        inputRef={inputRef}
        label={label}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        error={finalError}
        helperText={finalHelperText}
        disabled={disabled}
        InputProps={{
          endAdornment: unit ? (
            <InputAdornment position="end">{unit}</InputAdornment>
          ) : null,
        }}
        {...rest}
      />
    );
  }
);

SIInput.displayName = 'SIInput';