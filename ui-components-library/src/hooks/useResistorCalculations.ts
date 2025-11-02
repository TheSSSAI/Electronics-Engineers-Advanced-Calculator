import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Resistor } from '../types/electronics.types';
import { parseWithSIPrefix } from '../utils/si-prefix-parser';
import { formatNumber } from '../utils/number-formatter';

export interface ResistorCalculationsHookResult {
  resistors: Resistor[];
  addResistor: (stringValue: string) => void;
  updateResistor: (id: string, stringValue: string) => void;
  removeResistor: (id: string) => void;
  clearResistors: () => void;
  seriesResistance: string;
  parallelResistance: string;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useResistorCalculations = (): ResistorCalculationsHookResult => {
  const [resistors, setResistors] = useState<Resistor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addResistor = useCallback((stringValue: string) => {
    setError(null);
    const value = parseWithSIPrefix(stringValue);

    if (isNaN(value)) {
      setError('Please enter a valid number.');
      return;
    }
    if (value <= 0) {
      setError('Resistance must be a positive value.');
      return;
    }

    const newResistor: Resistor = {
      id: uuidv4(),
      value,
      stringValue,
    };
    setResistors(prev => [...prev, newResistor]);
  }, []);

  const updateResistor = useCallback((id: string, stringValue: string) => {
    setError(null);
    const value = parseWithSIPrefix(stringValue);

    if (isNaN(value)) {
      setError('Please enter a valid number.');
      return;
    }
    if (value <= 0) {
      setError('Resistance must be a positive value.');
      return;
    }

    setResistors(prev =>
      prev.map(r => (r.id === id ? { ...r, value, stringValue } : r))
    );
  }, []);

  const removeResistor = useCallback((id: string) => {
    setResistors(prev => prev.filter(r => r.id !== id));
  }, []);
  
  const clearResistors = useCallback(() => {
    setResistors([]);
    setError(null);
  }, []);

  const seriesResistance = useMemo(() => {
    if (resistors.length === 0) {
      return '0 Ω';
    }
    const total = resistors.reduce((sum, r) => sum + r.value, 0);
    return formatNumber(total, 4) + ' Ω';
  }, [resistors]);

  const parallelResistance = useMemo(() => {
    if (resistors.length === 0) {
      return '0 Ω';
    }
    if (resistors.some(r => r.value === 0)) {
        return 'Error: Cannot be zero for parallel calculation';
    }
    const sumOfReciprocals = resistors.reduce((sum, r) => sum + 1 / r.value, 0);
    if (sumOfReciprocals === 0) {
        return 'Infinity Ω';
    }
    const total = 1 / sumOfReciprocals;
    return formatNumber(total, 4) + ' Ω';
  }, [resistors]);

  return {
    resistors,
    addResistor,
    updateResistor,
    removeResistor,
    clearResistors,
    seriesResistance,
    parallelResistance,
    error,
    setError,
  };
};