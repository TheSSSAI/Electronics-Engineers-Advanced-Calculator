import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useResistorColorCode } from './useResistorColorCode';

describe('useResistorColorCode', () => {
  describe('Color to Value Conversion (US-036)', () => {
    it('should calculate a 4-band resistor correctly', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setBandCount(4);
        result.current.setColor('band1', 'brown');
        result.current.setColor('band2', 'black');
        result.current.setColor('multiplier', 'red');
        result.current.setColor('tolerance', 'gold');
      });

      expect(result.current.resistanceValue).toBe(1000);
      expect(result.current.toleranceValue).toBe(5);
    });

    it('should calculate a 5-band resistor correctly', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setBandCount(5);
        result.current.setColor('band1', 'orange');
        result.current.setColor('band2', 'orange');
        result.current.setColor('band3', 'black');
        result.current.setColor('multiplier', 'brown');
        result.current.setColor('tolerance', 'brown');
      });

      expect(result.current.resistanceValue).toBe(3300);
      expect(result.current.toleranceValue).toBe(1);
    });
    
    it('should calculate a 6-band resistor correctly', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setBandCount(6);
        result.current.setColor('band1', 'red');
        result.current.setColor('band2', 'violet');
        result.current.setColor('band3', 'green');
        result.current.setColor('multiplier', 'orange');
        result.current.setColor('tolerance', 'gold');
        result.current.setColor('tempCo', 'brown');
      });

      expect(result.current.resistanceValue).toBe(275000);
      expect(result.current.toleranceValue).toBe(5);
      expect(result.current.tempCoValue).toBe(100);
    });
    
    it('should handle a 3-band resistor with default tolerance', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setBandCount(3);
        result.current.setColor('band1', 'yellow');
        result.current.setColor('band2', 'violet');
        result.current.setColor('multiplier', 'orange');
      });
      
      expect(result.current.resistanceValue).toBe(47000);
      expect(result.current.toleranceValue).toBe(20);
    });
  });

  describe('Value to Color Conversion (US-034)', () => {
    it('should convert a 4-band value to colors', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setBandCount(4);
        result.current.setResistanceInput('220');
        result.current.setToleranceInput(5);
      });
      
      expect(result.current.bands.band1).toBe('red');
      expect(result.current.bands.band2).toBe('red');
      expect(result.current.bands.multiplier).toBe('brown');
      expect(result.current.bands.tolerance).toBe('gold');
    });

    it('should convert a 5-band value with SI prefix to colors', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setBandCount(5);
        result.current.setResistanceInput('4.7k');
        result.current.setToleranceInput(1);
      });

      expect(result.current.bands.band1).toBe('yellow');
      expect(result.current.bands.band2).toBe('violet');
      expect(result.current.bands.band3).toBe('black');
      expect(result.current.bands.multiplier).toBe('brown');
      expect(result.current.bands.tolerance).toBe('brown');
    });
    
    it('should convert a 6-band value to colors', () => {
        const { result } = renderHook(() => useResistorColorCode());
        act(() => {
            result.current.setBandCount(6);
            result.current.setResistanceInput('100');
            result.current.setToleranceInput(2);
            result.current.setTempCoInput(50);
        });

        expect(result.current.bands.band1).toBe('brown');
        expect(result.current.bands.band2).toBe('black');
        expect(result.current.bands.band3).toBe('black');
        expect(result.current.bands.multiplier).toBe('brown');
        expect(result.current.bands.tolerance).toBe('red');
        expect(result.current.bands.tempCo).toBe('red');
    });
  });

  describe('Nearest E-Series Suggestion (US-035)', () => {
    it('should suggest the nearest E24 value for a non-standard input', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setToleranceInput(5); // E24 series
        result.current.setResistanceInput('480');
      });
      expect(result.current.nearestStandardValue).toBe(470);
    });
    
    it('should suggest the nearest E96 value for a non-standard input', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setToleranceInput(1); // E96 series
        result.current.setResistanceInput('101');
      });
      expect(result.current.nearestStandardValue).toBe(102);
    });

    it('should not suggest a value if the input is already a standard value', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setToleranceInput(10); // E12 series
        result.current.setResistanceInput('3300');
      });
      expect(result.current.nearestStandardValue).toBeNull();
    });
    
    it('should suggest the lower value when equidistant', () => {
      const { result } = renderHook(() => useResistorColorCode());
      act(() => {
        result.current.setToleranceInput(5); // E24 series (470, 510)
        result.current.setResistanceInput('490');
      });
      expect(result.current.nearestStandardValue).toBe(470);
    });
  });
  
  it('should reset state when band count is changed', () => {
    const { result } = renderHook(() => useResistorColorCode());
    act(() => {
        result.current.setBandCount(4);
        result.current.setColor('band1', 'brown');
        result.current.setResistanceInput('1k');
    });
    
    expect(result.current.resistanceValue).toBe(10); // Something non-default
    
    act(() => {
        result.current.setBandCount(5);
    });
    
    expect(result.current.resistanceValue).toBe(0);
    expect(result.current.resistanceInput).toBe('');
    expect(result.current.bands.band1).toBe('black'); // default color
  });
});