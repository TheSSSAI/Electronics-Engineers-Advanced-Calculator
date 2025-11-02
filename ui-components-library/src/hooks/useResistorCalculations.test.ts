import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useResistorCalculations } from './useResistorCalculations';

describe('useResistorCalculations', () => {
  // US-032
  it('should start with an empty list of resistors', () => {
    const { result } = renderHook(() => useResistorCalculations());
    expect(result.current.resistors).toEqual([]);
    expect(result.current.seriesResistance).toBe(0);
    expect(result.current.parallelResistance).toBe(0);
  });

  it('should add a valid resistor to the list', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('1k');
    });
    expect(result.current.resistors).toHaveLength(1);
    expect(result.current.resistors[0].value).toBe(1000);
  });
  
  it('should add multiple resistors to the list', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('1k');
      result.current.addResistor('470');
    });
    expect(result.current.resistors).toHaveLength(2);
  });
  
  // US-033
  it('should not add an invalid resistor value', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('abc');
    });
    expect(result.current.resistors).toHaveLength(0);
  });
  
  it('should not add a zero resistor value', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('0');
    });
    expect(result.current.resistors).toHaveLength(0);
  });
  
  it('should not add a negative resistor value', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('-100');
    });
    expect(result.current.resistors).toHaveLength(0);
  });
  
  it('should remove a resistor from the list', () => {
    const { result } = renderHook(() => useResistorCalculations());
    let idToRemove: string;
    act(() => {
      result.current.addResistor('1k');
      idToRemove = result.current.resistors[0].id;
      result.current.addResistor('470');
    });
    
    expect(result.current.resistors).toHaveLength(2);
    
    act(() => {
      result.current.removeResistor(idToRemove);
    });
    
    expect(result.current.resistors).toHaveLength(1);
    expect(result.current.resistors[0].value).toBe(470);
  });
  
  it('should update a resistor value', () => {
    const { result } = renderHook(() => useResistorCalculations());
    let idToUpdate: string;
    act(() => {
      result.current.addResistor('1k');
      idToUpdate = result.current.resistors[0].id;
    });
    
    act(() => {
      result.current.updateResistor(idToUpdate, '2.2k');
    });
    
    expect(result.current.resistors).toHaveLength(1);
    expect(result.current.resistors[0].value).toBe(2200);
  });
  
  it('should not update a resistor to an invalid value', () => {
    const { result } = renderHook(() => useResistorCalculations());
    let idToUpdate: string;
    act(() => {
      result.current.addResistor('1k');
      idToUpdate = result.current.resistors[0].id;
    });

    act(() => {
      result.current.updateResistor(idToUpdate, '-200');
    });

    expect(result.current.resistors[0].value).toBe(1000);
  });

  // US-030
  it('should calculate series resistance correctly', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('1k');
      result.current.addResistor('2.2k');
      result.current.addResistor('470');
    });
    
    act(() => {
      result.current.calculateSeries();
    });
    
    expect(result.current.seriesResistance).toBe(3670);
  });
  
  it('should calculate series resistance for a single resistor', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('4.7M');
    });
    act(() => {
      result.current.calculateSeries();
    });
    expect(result.current.seriesResistance).toBe(4700000);
  });

  // US-031
  it('should calculate parallel resistance correctly', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('1k');
      result.current.addResistor('2.2k');
      result.current.addResistor('470');
    });
    
    act(() => {
      result.current.calculateParallel();
    });

    expect(result.current.parallelResistance).toBeCloseTo(298.14);
  });
  
  it('should calculate parallel resistance for a single resistor', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('1k');
    });
    act(() => {
      result.current.calculateParallel();
    });
    expect(result.current.parallelResistance).toBe(1000);
  });
  
  it('should reset calculations when the list changes', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
      result.current.addResistor('1k');
      result.current.addResistor('1k');
    });
    act(() => {
      result.current.calculateSeries();
      result.current.calculateParallel();
    });

    expect(result.current.seriesResistance).toBe(2000);
    expect(result.current.parallelResistance).toBe(500);

    act(() => {
      result.current.addResistor('1k');
    });

    expect(result.current.seriesResistance).toBe(0);
    expect(result.current.parallelResistance).toBe(0);
  });

  it('should clear all resistors and calculations', () => {
    const { result } = renderHook(() => useResistorCalculations());
    act(() => {
        result.current.addResistor('1k');
        result.current.addResistor('2k');
        result.current.calculateSeries();
    });

    expect(result.current.resistors).toHaveLength(2);
    expect(result.current.seriesResistance).toBe(3000);

    act(() => {
        result.current.clearAll();
    });

    expect(result.current.resistors).toEqual([]);
    expect(result.current.seriesResistance).toBe(0);
    expect(result.current.parallelResistance).toBe(0);
  });
});