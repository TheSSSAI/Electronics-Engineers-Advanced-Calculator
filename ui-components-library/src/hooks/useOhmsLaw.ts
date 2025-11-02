import { useState, useEffect, useCallback, useMemo } from 'react';
import { OhmsLawValues, OhmsLawField } from '../types/electronics.types';
import { parseWithSIPrefix } from '../utils/si-prefix-parser';

export interface OhmsLawHookResult {
  values: OhmsLawValues;
  errors: Record<OhmsLawField, string | null>;
  guidance: string | null;
  handleValueChange: (field: OhmsLawField, value: string) => void;
  clearAll: () => void;
}

const INITIAL_VALUES: OhmsLawValues = {
  voltage: '',
  current: '',
  resistance: '',
  power: '',
};

const INITIAL_ERRORS: Record<OhmsLawField, string | null> = {
  voltage: null,
  current: null,
  resistance: null,
  power: null,
};

export const useOhmsLaw = (): OhmsLawHookResult => {
  const [values, setValues] = useState<OhmsLawValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [userInputFields, setUserInputFields] = useState<OhmsLawField[]>([]);

  const parsedValues = useMemo(() => {
    const parsed: Partial<Record<OhmsLawField, number>> = {};
    let errorFields = { ...INITIAL_ERRORS };
    let validFieldCount = 0;

    (Object.keys(values) as OhmsLawField[]).forEach((field) => {
      const strValue = values[field];
      if (strValue === '' || strValue === null) {
        return;
      }
      
      const parsedValue = parseWithSIPrefix(strValue);
      if (isNaN(parsedValue)) {
        errorFields[field] = 'Invalid number';
      } else {
        if (field === 'resistance' && parsedValue <= 0) {
            errorFields[field] = 'Must be > 0';
        } else if (field === 'power' && parsedValue < 0) {
            errorFields[field] = 'Must be >= 0';
        } else {
            parsed[field] = parsedValue;
            validFieldCount++;
        }
      }
    });

    setErrors(errorFields);
    return { parsed, validFieldCount };
  }, [values]);

  useEffect(() => {
    if (userInputFields.length !== 2 || parsedValues.validFieldCount !== 2) {
      if (userInputFields.length > 2) {
        // Clear calculated fields if user enters a third value
        const calculatedFields = (Object.keys(values) as OhmsLawField[]).filter(
          f => !userInputFields.includes(f)
        );
        if(calculatedFields.length > 0) {
            setValues(currentValues => {
                const newValues = { ...currentValues };
                calculatedFields.forEach(f => newValues[f] = '');
                return newValues;
            });
        }
      }
      return;
    }

    const { parsed } = parsedValues;
    const v = parsed.voltage;
    const i = parsed.current;
    const r = parsed.resistance;
    const p = parsed.power;
    let newValues: Partial<OhmsLawValues> = {};

    try {
      if (v !== undefined && i !== undefined) {
        newValues.resistance = v / i;
        newValues.power = v * i;
      } else if (v !== undefined && r !== undefined) {
        newValues.current = v / r;
        newValues.power = (v * v) / r;
      } else if (v !== undefined && p !== undefined) {
        newValues.current = p / v;
        newValues.resistance = (v * v) / p;
      } else if (i !== undefined && r !== undefined) {
        newValues.voltage = i * r;
        newValues.power = (i * i) * r;
      } else if (i !== undefined && p !== undefined) {
        newValues.voltage = p / i;
        newValues.resistance = p / (i * i);
      } else if (r !== undefined && p !== undefined) {
        newValues.voltage = Math.sqrt(p * r);
        newValues.current = Math.sqrt(p / r);
      }

      setValues(currentValues => ({
        ...currentValues,
        ...Object.fromEntries(
            Object.entries(newValues).map(([key, value]) => [
                key,
                isFinite(value) ? value.toPrecision(4) : 'Infinity'
            ])
        )
      }));

    } catch (e) {
      // Should not happen with validation, but as a safeguard
      console.error("Calculation error in useOhmsLaw:", e);
    }
  }, [parsedValues, userInputFields, values]);


  const handleValueChange = useCallback((field: OhmsLawField, value: string) => {
    
    // Manage user input fields
    let newInputs = [...userInputFields];
    if (value !== '' && !newInputs.includes(field)) {
      newInputs.push(field);
    } else if (value === '' && newInputs.includes(field)) {
      newInputs = newInputs.filter(f => f !== field);
    }
    
    if (newInputs.length > 2) {
        // If we are entering a 3rd value, find the "oldest" of the other two and remove it
        const fieldsToKeep = [newInputs[newInputs.length - 2], newInputs[newInputs.length - 1]];
        const fieldToClear = newInputs[0];
        
        setValues(prev => ({ ...prev, [fieldToClear]: '', [field]: value }));
        setUserInputFields(fieldsToKeep);
    } else {
        setValues(prev => ({ ...prev, [field]: value }));
        setUserInputFields(newInputs);
    }

    // if only one field is left, clear the calculated fields
    if (newInputs.length < 2) {
      setValues(prev => {
        const clearedValues = { ...INITIAL_VALUES };
        newInputs.forEach(f => clearedValues[f] = prev[f]);
        return clearedValues;
      });
    }

  }, [userInputFields]);

  const clearAll = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors(INITIAL_ERRORS);
    setUserInputFields([]);
  }, []);

  const guidance = useMemo(() => {
    const hasErrors = Object.values(errors).some(e => e !== null);
    if (!hasErrors && userInputFields.length < 2) {
        return 'Enter any two values to calculate.';
    }
    return null;
  }, [errors, userInputFields.length]);


  return {
    values,
    errors,
    guidance,
    handleValueChange,
    clearAll,
  };
};