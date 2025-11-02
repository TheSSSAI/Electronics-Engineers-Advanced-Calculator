import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useOhmsLaw } from './useOhmsLaw';

describe('useOhmsLaw', () => {
  // US-027 AC-001: Given V and I
  it('should calculate resistance and power given voltage and current', () => {
    const { result } = renderHook(() => useOhmsLaw({}));
    
    act(() => {
      result.current.setVoltage('12');
      result.current.setCurrent('0.5'); // 500mA
    });

    expect(result.current.values.resistance).toBe('24');
    expect(result.current.values.power).toBe('6');
  });

  // US-027 AC-002: Given V and R
  it('should calculate current and power given voltage and resistance', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setVoltage('5');
      result.current.setResistance('1k');
    });

    expect(result.current.values.current).toBe('0.005');
    expect(result.current.values.power).toBe('0.025');
  });

  // US-027 AC-004: Given I and R
  it('should calculate voltage and power given current and resistance', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setCurrent('2');
      result.current.setResistance('10');
    });

    expect(result.current.values.voltage).toBe('20');
    expect(result.current.values.power).toBe('40');
  });

  // US-027 AC-006: Given R and P
  it('should calculate voltage and current given resistance and power', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setResistance('50');
      result.current.setPower('2');
    });

    expect(result.current.values.voltage).toBe('10');
    expect(result.current.values.current).toBe('0.2');
  });

  // US-027 AC-005: Given I and P
  it('should calculate voltage and resistance given current and power', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setCurrent('3');
      result.current.setPower('18');
    });

    expect(result.current.values.voltage).toBe('6');
    expect(result.current.values.resistance).toBe('2');
  });

  // US-027 AC-003: Given V and P
  it('should calculate current and resistance given voltage and power', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setVoltage('9');
      result.current.setPower('1');
    });

    expect(result.current.values.current).toBeCloseTo(0.111111);
    expect(result.current.values.resistance).toBe('81');
  });

  // US-028: Guidance for insufficient input
  it('should not perform calculation with only one input', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setVoltage('10');
    });

    expect(result.current.values.current).toBe('');
    expect(result.current.values.resistance).toBe('');
    expect(result.current.values.power).toBe('');
  });

  // US-029: Validation
  it('should set an error for negative resistance and not calculate', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setVoltage('10');
      result.current.setResistance('-100');
    });

    expect(result.current.errors.resistance).toBe('Resistance must be a positive value');
    expect(result.current.values.current).toBe('');
    expect(result.current.values.power).toBe('');
  });
  
  it('should set an error for zero resistance and not calculate', () => {
    const { result } = renderHook(() => useOhmsLaw({}));
    act(() => {
      result.current.setVoltage('10');
      result.current.setResistance('0');
    });
    expect(result.current.errors.resistance).toBe('Resistance must be a positive value');
  });

  it('should set an error for negative power and not calculate', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setVoltage('10');
      result.current.setPower('-5');
    });

    expect(result.current.errors.power).toBe('Power must be a non-negative value');
    expect(result.current.values.current).toBe('');
    expect(result.current.values.resistance).toBe('');
  });
  
  it('should clear errors when corrected', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setResistance('-100');
    });
    expect(result.current.errors.resistance).not.toBeNull();
    
    act(() => {
      result.current.setResistance('100');
    });
    expect(result.current.errors.resistance).toBeNull();
  });

  it('should reset all values and errors when clear is called', () => {
    const { result } = renderHook(() => useOhmsLaw({}));

    act(() => {
      result.current.setVoltage('12');
      result.current.setCurrent('-0.5'); // Will cause error
    });

    expect(result.current.values.voltage).toBe('12');
    expect(result.current.errors.current).not.toBeNull();
    
    act(() => {
      result.current.clear();
    });
    
    expect(result.current.values.voltage).toBe('');
    expect(result.current.values.current).toBe('');
    expect(result.current.values.resistance).toBe('');
    expect(result.current.values.power).toBe('');
    expect(result.current.errors.voltage).toBeNull();
    expect(result.current.errors.current).toBeNull();
    expect(result.current.errors.resistance).toBeNull();
    expect(result.current.errors.power).toBeNull();
  });
  
  it('should handle clearing one of two inputs', () => {
     const { result } = renderHook(() => useOhmsLaw({}));
    
    act(() => {
      result.current.setVoltage('12');
      result.current.setCurrent('0.5');
    });
    expect(result.current.values.resistance).toBe('24');
    expect(result.current.values.power).toBe('6');
    
    act(() => {
      result.current.setCurrent('');
    });
    expect(result.current.values.resistance).toBe('');
    expect(result.current.values.power).toBe('');
  });
  
  // US-027 AC-009: Division by zero
  it('should handle division by zero gracefully', () => {
    const { result } = renderHook(() => useOhmsLaw({}));
    
    act(() => {
      result.current.setVoltage('12');
      result.current.setCurrent('0');
    });

    expect(result.current.values.resistance).toBe('Infinity');
    expect(result.current.values.power).toBe('0');
  });

});