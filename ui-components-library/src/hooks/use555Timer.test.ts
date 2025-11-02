import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { use555Timer } from './use555Timer';

describe('use555Timer', () => {
  // Astable Mode Tests (US-037)
  describe('Astable Mode', () => {
    it('should calculate RA and RB given known C', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setAstableInputs({
          frequency: '1k',
          dutyCycle: '75',
          knownComponent: 'C',
          rA: '',
          rB: '',
          c: '10n',
        });
      });

      expect(parseFloat(result.current.astableOutputs.rA)).toBeCloseTo(72150, -1);
      expect(parseFloat(result.current.astableOutputs.rB)).toBeCloseTo(36075, -1);
    });

    it('should calculate RB and C given known RA', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setAstableInputs({
          frequency: '100',
          dutyCycle: '60',
          knownComponent: 'RA',
          rA: '10k',
          rB: '',
          c: '',
        });
      });
      expect(parseFloat(result.current.astableOutputs.rB)).toBeCloseTo(6666.67, 2);
      expect(parseFloat(result.current.astableOutputs.c)).toBeCloseTo(0.00000096, 8);
    });

    it('should calculate RA and C given known RB', () => {
        const { result } = renderHook(() => use555Timer());
        act(() => {
          result.current.setAstableInputs({
            frequency: '500',
            dutyCycle: '90',
            knownComponent: 'RB',
            rA: '',
            rB: '10k',
            c: '',
          });
        });
        expect(parseFloat(result.current.astableOutputs.rA)).toBeCloseTo(80000, 0);
        expect(parseFloat(result.current.astableOutputs.c)).toBeCloseTo(0.000000032, 9);
    });
    
    // US-038
    it('should set an error for duty cycle <= 50%', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setAstableInputs({
          frequency: '1k',
          dutyCycle: '50',
          knownComponent: 'C',
          c: '10n',
          rA: '', rB: ''
        });
      });
      expect(result.current.astableErrors.dutyCycle).toBe('Duty cycle must be > 50% and < 100%');
    });

    it('should set an error for duty cycle >= 100%', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setAstableInputs({
          frequency: '1k',
          dutyCycle: '100',
          knownComponent: 'C',
          c: '10n',
          rA: '', rB: ''
        });
      });
      expect(result.current.astableErrors.dutyCycle).toBe('Duty cycle must be > 50% and < 100%');
    });

    it('should not calculate if inputs are incomplete', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setAstableInputs({
          frequency: '1k',
          dutyCycle: '75',
          knownComponent: 'C',
          c: '', // Incomplete
          rA: '', rB: ''
        });
      });
      expect(result.current.astableOutputs.rA).toBe('');
      expect(result.current.astableOutputs.rB).toBe('');
    });
  });

  // Monostable Mode Tests (US-039)
  describe('Monostable Mode', () => {
    it('should calculate R given T and C', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setMonostableInputs({
          pulseWidth: '1.1',
          r: '',
          c: '1u',
        });
      });
      expect(parseFloat(result.current.monostableOutputs.r)).toBeCloseTo(1000000);
    });
    
    it('should calculate C given T and R', () => {
      const { result } = renderHook(() => use555Timer());
      act(() => {
        result.current.setMonostableInputs({
          pulseWidth: '100m',
          r: '10k',
          c: '',
        });
      });
      expect(parseFloat(result.current.monostableOutputs.c)).toBeCloseTo(0.00000909, 8);
    });
    
    it('should not calculate with only one monostable input', () => {
        const { result } = renderHook(() => use555Timer());
        act(() => {
          result.current.setMonostableInputs({
            pulseWidth: '100m',
            r: '',
            c: '',
          });
        });
        expect(result.current.monostableOutputs.r).toBe('');
        expect(result.current.monostableOutputs.c).toBe('');
    });
  });
  
  // Practical Value Warnings (US-040)
  describe('Practical Value Warnings', () => {
    it('should set a warning for an impractical calculated resistor value', () => {
        const { result } = renderHook(() => use555Timer());
        act(() => {
          result.current.setAstableInputs({
            frequency: '1M', // High frequency
            dutyCycle: '75',
            knownComponent: 'C',
            c: '10n',
            rA: '', rB: ''
          });
        });

        // RA will be ~72 Ohm, RB will be ~36 Ohm, both below 1k
        expect(result.current.astableWarnings.rA).not.toBeNull();
        expect(result.current.astableWarnings.rB).not.toBeNull();
        expect(result.current.astableWarnings.c).toBeNull();
    });
    
    it('should set a warning for an impractical calculated capacitor value', () => {
        const { result } = renderHook(() => use555Timer());
        act(() => {
          result.current.setMonostableInputs({
            pulseWidth: '1s',
            r: '100', // Very low resistance
            c: '',
          });
        });

        // C will be ~9.09mF, which is above 1000uF
        expect(result.current.monostableWarnings.c).not.toBeNull();
        expect(result.current.monostableWarnings.r).toBeNull(); // Input values are not warned
    });
  });
});