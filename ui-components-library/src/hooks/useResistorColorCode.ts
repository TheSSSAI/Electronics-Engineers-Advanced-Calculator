import { useState, useCallback, useMemo } from 'react';
import {
  ResistorBandCount,
  ColorCode,
  EIAColorCode,
  ESeries,
  ESeriesMap,
  ToleranceToESeries,
} from '../types/electronics.types';
import { parseWithSIPrefix } from '../utils/si-prefix-parser';
import { formatNumber } from '../utils/number-formatter';

// Data should ideally be in a separate constants file, but for this level it's here.
const COLOR_CODES: Record<ColorCode, EIAColorCode> = {
  black:  { value: 0, multiplier: 1,      tolerance: null,  tempCo: 250 },
  brown:  { value: 1, multiplier: 10,     tolerance: 1,     tempCo: 100 },
  red:    { value: 2, multiplier: 100,    tolerance: 2,     tempCo: 50 },
  orange: { value: 3, multiplier: 1000,   tolerance: null,  tempCo: 15 },
  yellow: { value: 4, multiplier: 10000,  tolerance: null,  tempCo: 25 },
  green:  { value: 5, multiplier: 100000, tolerance: 0.5,   tempCo: 20 },
  blue:   { value: 6, multiplier: 1000000,tolerance: 0.25,  tempCo: 10 },
  violet: { value: 7, multiplier: 10000000,tolerance: 0.1,   tempCo: 5 },
  gray:   { value: 8, multiplier: 100000000,tolerance: 0.05,  tempCo: 1 },
  white:  { value: 9, multiplier: 1000000000,tolerance: null,  tempCo: null },
  gold:   { value: null, multiplier: 0.1,    tolerance: 5,     tempCo: null },
  silver: { value: null, multiplier: 0.01,   tolerance: 10,    tempCo: null },
  none:   { value: null, multiplier: null,   tolerance: 20,    tempCo: null },
};

const E_SERIES_VALUES: ESeriesMap = {
  E6: [10, 15, 22, 33, 47, 68],
  E12: [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82],
  E24: [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91],
  E48: [100, 105, 110, 115, 121, 127, 133, 140, 147, 154, 162, 169, 178, 187, 196, 205, 215, 226, 237, 249, 261, 274, 287, 301, 316, 332, 348, 365, 383, 402, 422, 442, 464, 487, 511, 536, 562, 590, 619, 649, 681, 715, 750, 787, 825, 866, 909, 953],
  E96: [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976],
};

const TOLERANCE_TO_ESERIES: ToleranceToESeries = {
  20: 'E6', 10: 'E12', 5: 'E24', 2: 'E48', 1: 'E96', 0.5: 'E96', 0.25: 'E96', 0.1: 'E96', 0.05: 'E96'
};

const findNearestEValue = (value: number, series: ESeries): number | null => {
    if (value <= 0) return null;
    const seriesValues = E_SERIES_VALUES[series];
    if(!seriesValues) return null;

    let magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalizedValue = value / magnitude;

    let closestValue = seriesValues[0];
    let smallestDiff = Math.abs(normalizedValue - closestValue);

    for (const v of seriesValues) {
        const diff = Math.abs(normalizedValue - v);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closestValue = v;
        } else if (diff === smallestDiff && v < closestValue) {
            closestValue = v; // Tie-break to lower value
        }
    }
    
    // Check next magnitude
    const nextMagnitudeValue = seriesValues[0] * 10;
    const diffNext = Math.abs(normalizedValue - nextMagnitudeValue);
    if(diffNext < smallestDiff) {
        magnitude *= 10;
        closestValue = seriesValues[0];
    }

    const finalValue = closestValue * magnitude;

    // Adjust for multiple orders of magnitude E48/E96
    if (series === 'E48' || series === 'E96') {
        return parseFloat(finalValue.toPrecision(3));
    }

    return parseFloat(finalValue.toPrecision(2));
};

export const useResistorColorCode = () => {
    const [bandCount, setBandCount] = useState<ResistorBandCount>(4);
    const [colors, setColors] = useState<(ColorCode | null)[]>([null, null, null, null, null, null]);
    
    // Value to Color state
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedTolerance, setSelectedTolerance] = useState<number | null>(5);
    const [selectedTempCo, setSelectedTempCo] = useState<number | null>(null);

    const handleColorChange = useCallback((bandIndex: number, color: ColorCode | null) => {
        setColors(prev => {
            const newColors = [...prev];
            newColors[bandIndex] = color;
            return newColors;
        });
    }, []);

    const resetColors = useCallback(() => {
        setColors([null, null, null, null, null, null]);
    }, []);

    // Color to Value Calculation
    const colorToValueResult = useMemo(() => {
        const significantDigits: number[] = [];
        let multiplier: number | null = null;
        let tolerance: number | null = null;
        let tempCo: number | null = null;

        const numSigDigits = bandCount === 3 || bandCount === 4 ? 2 : 3;

        for(let i=0; i < numSigDigits; i++) {
            if(colors[i] === null || COLOR_CODES[colors[i]!].value === null) return null;
            significantDigits.push(COLOR_CODES[colors[i]!].value!);
        }

        const baseValue = parseInt(significantDigits.join(''), 10);
        
        const multiplierColor = colors[numSigDigits];
        if (multiplierColor) multiplier = COLOR_CODES[multiplierColor].multiplier;

        const toleranceColor = colors[numSigDigits + 1];
        if (toleranceColor) tolerance = COLOR_CODES[toleranceColor].tolerance;
        
        if(bandCount === 3) tolerance = COLOR_CODES.none.tolerance;

        const tempCoColor = colors[numSigDigits + 2];
        if (bandCount === 6 && tempCoColor) tempCo = COLOR_CODES[tempCoColor].tempCo;

        if (multiplier === null) return null;

        const resistance = baseValue * multiplier;

        return {
            resistance: formatNumber(resistance, 3) + ' Ω',
            tolerance: tolerance !== null ? `±${tolerance}%` : null,
            tempCo: tempCo !== null ? `${tempCo} ppm/°C` : null,
        };

    }, [colors, bandCount]);


    // Value to Color Calculation
    const valueToColorResult = useMemo(() => {
        const resistance = parseWithSIPrefix(inputValue);
        if (isNaN(resistance) || resistance <= 0) return { colors: Array(6).fill(null), suggestion: null };

        const toleranceKey = selectedTolerance as keyof ToleranceToESeries;
        const eSeries = TOLERANCE_TO_ESERIES[toleranceKey] || 'E24';
        const nearestValue = findNearestEValue(resistance, eSeries);
        const suggestion = (nearestValue !== null && nearestValue !== resistance) ? `Nearest standard value: ${formatNumber(nearestValue)} Ω` : null;

        const valueStr = resistance.toExponential(10).replace('.', ''); // High precision string
        
        let sigDigitsStr = '';
        let multiplierExp = 0;
        const numSigDigits = bandCount === 3 || bandCount === 4 ? 2 : 3;

        const firstNonZero = valueStr.search(/[1-9]/);
        if (firstNonZero === -1) { // is zero
            sigDigitsStr = '0'.repeat(numSigDigits);
            multiplierExp = 1 - numSigDigits;
        } else {
             sigDigitsStr = valueStr.substring(firstNonZero, firstNonZero + numSigDigits);
             multiplierExp = Math.floor(Math.log10(resistance)) - (numSigDigits - 1);
        }
        
        const sigDigitColors = sigDigitsStr.split('').map(digit => 
            Object.keys(COLOR_CODES).find(key => COLOR_CODES[key as ColorCode].value === parseInt(digit)) as ColorCode
        );

        const multiplierPower = Math.pow(10, multiplierExp);
        const multiplierColor = Object.keys(COLOR_CODES).find(key => COLOR_CODES[key as ColorCode].multiplier === multiplierPower) as ColorCode;
        
        const toleranceColor = Object.keys(COLOR_CODES).find(key => COLOR_CODES[key as ColorCode].tolerance === selectedTolerance) as ColorCode;
        
        const tempCoColor = Object.keys(COLOR_CODES).find(key => COLOR_CODES[key as ColorCode].tempCo === selectedTempCo) as ColorCode;

        let finalColors: (ColorCode | null)[] = [...sigDigitColors, multiplierColor, toleranceColor, tempCoColor];
        if (bandCount === 3) finalColors = [...sigDigitColors, multiplierColor, null, null];
        if (bandCount === 4) finalColors = [...sigDigitColors, multiplierColor, toleranceColor, null];
        if (bandCount === 5) finalColors = [...sigDigitColors, multiplierColor, toleranceColor, null];


        return { colors: finalColors.slice(0, bandCount), suggestion };
    }, [inputValue, selectedTolerance, selectedTempCo, bandCount]);

    return {
        // Color to Value
        bandCount,
        setBandCount,
        colors,
        handleColorChange,
        resetColors,
        colorToValueResult,
        COLOR_CODES,
        
        // Value to Color
        inputValue,
        setInputValue,
        selectedTolerance,
        setSelectedTolerance,
        selectedTempCo,
        setSelectedTempCo,
        valueToColorResult
    };
};