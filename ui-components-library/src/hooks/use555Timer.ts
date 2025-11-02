import { useState, useMemo, useCallback } from 'react';
import {
  FiveFiftyFiveTimerMode,
  AstableKnownComponent,
  PracticalComponentWarning,
} from '../types/electronics.types';
import { parseWithSIPrefix } from '../utils/si-prefix-parser';
import { formatNumber } from '../utils/number-formatter';

// --- Astable State & Logic ---
interface AstableState {
  frequency: string;
  dutyCycle: string;
  knownComponent: AstableKnownComponent;
  ra: string;
  rb: string;
  c: string;
}

interface AstableResult {
  ra?: number;
  rb?: number;
  c?: number;
  error?: string;
  warnings: PracticalComponentWarning[];
}

const INITIAL_ASTABLE_STATE: AstableState = {
  frequency: '',
  dutyCycle: '',
  knownComponent: 'C',
  ra: '',
  rb: '',
  c: '',
};

const calculateAstable = (state: AstableState): AstableResult => {
  const f = parseWithSIPrefix(state.frequency);
  const d = parseWithSIPrefix(state.dutyCycle) / 100;

  if (isNaN(f) || isNaN(d)) return { warnings: [] };
  if (f <= 0) return { error: 'Frequency must be positive.', warnings: [] };
  if (d <= 0.5 || d >= 1.0) {
    return { error: 'Duty Cycle must be > 50% and < 100%.', warnings: [] };
  }
  
  let ra_val: number | undefined, rb_val: number | undefined, c_val: number | undefined;

  switch(state.knownComponent) {
    case 'C': {
      c_val = parseWithSIPrefix(state.c);
      if (isNaN(c_val) || c_val <= 0) return { warnings: [] };
      const totalR = 1.44 / (f * c_val);
      rb_val = totalR * (1 - d);
      ra_val = totalR - 2 * rb_val;
      break;
    }
    case 'RA': {
      ra_val = parseWithSIPrefix(state.ra);
      if (isNaN(ra_val) || ra_val <= 0) return { warnings: [] };
      // d = (ra + rb) / (ra + 2rb) => d*ra + 2d*rb = ra + rb => (2d-1)rb = ra - d*ra
      rb_val = (ra_val * (1 - d)) / (2 * d - 1);
      c_val = 1.44 / ((ra_val + 2 * rb_val) * f);
      break;
    }
    case 'RB': {
      rb_val = parseWithSIPrefix(state.rb);
      if (isNaN(rb_val) || rb_val <= 0) return { warnings: [] };
      ra_val = rb_val * ((2 * d - 1) / (1 - d));
      c_val = 1.44 / ((ra_val + 2 * rb_val) * f);
      break;
    }
  }

  if(ra_val === undefined || rb_val === undefined || c_val === undefined || ra_val <= 0 || rb_val <= 0 || c_val <= 0) {
    return { error: 'Invalid combination. Check inputs.', warnings: [] };
  }

  // Check practical ranges
  const warnings: PracticalComponentWarning[] = [];
  if (ra_val < 1000 || ra_val > 10_000_000) warnings.push('RA');
  if (rb_val < 1000 || rb_val > 10_000_000) warnings.push('RB');
  if (c_val < 100e-12 || c_val > 1000e-6) warnings.push('C');

  return { ra: ra_val, rb: rb_val, c: c_val, warnings };
};


// --- Monostable State & Logic ---
interface MonostableState {
  pulseWidth: string;
  r: string;
  c: string;
}

interface MonostableResult {
  r?: number;
  c?: number;
  error?: string;
  warnings: PracticalComponentWarning[];
}

const INITIAL_MONOSTABLE_STATE: MonostableState = {
  pulseWidth: '',
  r: '',
  c: '',
};

const calculateMonostable = (state: MonostableState): MonostableResult => {
    const t = parseWithSIPrefix(state.pulseWidth);
    const r_in = parseWithSIPrefix(state.r);
    const c_in = parseWithSIPrefix(state.c);
    
    if (isNaN(t) || t <= 0) return { error: 'Pulse width must be positive.', warnings: [] };

    const hasR = !isNaN(r_in) && r_in > 0;
    const hasC = !isNaN(c_in) && c_in > 0;

    if (!hasR && !hasC) return { warnings: [] };
    if (hasR && hasC) return { warnings: [] }; // Only calculate when one is missing

    let r_val: number | undefined, c_val: number | undefined;

    if (hasR) {
        r_val = r_in;
        c_val = t / (1.1 * r_val);
    } else { // hasC
        c_val = c_in;
        r_val = t / (1.1 * c_val);
    }
    
    const warnings: PracticalComponentWarning[] = [];
    if (r_val < 1000 || r_val > 10_000_000) warnings.push('R');
    if (c_val < 100e-12 || c_val > 1000e-6) warnings.push('C');
    
    return { r: r_val, c: c_val, warnings };
};


// --- The Hook ---
export const use555Timer = () => {
  const [mode, setMode] = useState<FiveFiftyFiveTimerMode>('astable');
  const [astableState, setAstableState] = useState<AstableState>(INITIAL_ASTABLE_STATE);
  const [monostableState, setMonostableState] = useState<MonostableState>(INITIAL_MONOSTABLE_STATE);

  const astableResult = useMemo(() => calculateAstable(astableState), [astableState]);
  const monostableResult = useMemo(() => calculateMonostable(monostableState), [monostableState]);

  const handleAstableChange = useCallback(<K extends keyof AstableState>(field: K, value: AstableState[K]) => {
      setAstableState(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const handleMonostableChange = useCallback(<K extends keyof MonostableState>(field: K, value: MonostableState[K]) => {
      setMonostableState(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const clearAstable = useCallback(() => setAstableState(INITIAL_ASTABLE_STATE), []);
  const clearMonostable = useCallback(() => setMonostableState(INITIAL_MONOSTABLE_STATE), []);

  const formattedAstableResults = useMemo(() => ({
      ra: astableResult.ra ? formatNumber(astableResult.ra, 4) : '',
      rb: astableResult.rb ? formatNumber(astableResult.rb, 4) : '',
      c: astableResult.c ? formatNumber(astableResult.c, 4) : '',
  }), [astableResult]);

  const formattedMonostableResults = useMemo(() => ({
    r: monostableResult.r ? formatNumber(monostableResult.r, 4) : '',
    c: monostableResult.c ? formatNumber(monostableResult.c, 4) : '',
  }), [monostableResult]);


  return {
    mode,
    setMode,

    astableState,
    handleAstableChange,
    astableResult,
    formattedAstableResults,
    clearAstable,

    monostableState,
    handleMonostableChange,
    monostableResult,
    formattedMonostableResults,
    clearMonostable,
  };
};