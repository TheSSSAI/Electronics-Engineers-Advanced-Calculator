import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useOhmsLaw } from '../../hooks/useOhmsLaw';
import { SIInput } from '../shared/SIInput/SIInput';
import { GuidanceMessage } from '../shared/GuidanceMessage/GuidanceMessage';
import type { OhmsLawCalculatorProps } from './OhmsLawCalculator.types';

export const OhmsLawCalculator: React.FC<OhmsLawCalculatorProps> = React.memo(
  ({ initialValues, onCalculation, labels }) => {
    const { t } = useTranslation();
    const {
      values,
      errors,
      calculatedFields,
      guidance,
      handleValueChange,
      clearAll,
    } = useOhmsLaw(initialValues, onCalculation);

    const defaultLabels = {
      voltage: t('electronics.voltage'),
      current: t('electronics.current'),
      resistance: t('electronics.resistance'),
      power: t('electronics.power'),
      guidance: t('electronics.ohmsLawGuidance'),
      reset: t('common.reset'),
    };

    const mergedLabels = { ...defaultLabels, ...labels };

    return (
      <Grid container spacing={2} data-testid="ohms-law-calculator">
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t('electronics.ohmsLawAndPower')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SIInput
            label={mergedLabels.voltage}
            unit="V"
            value={values.voltage}
            onChange={(val) => handleValueChange('voltage', val)}
            error={!!errors.voltage}
            helperText={errors.voltage}
            isCalculated={calculatedFields.has('voltage')}
            data-testid="voltage-input"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SIInput
            label={mergedLabels.current}
            unit="A"
            value={values.current}
            onChange={(val) => handleValueChange('current', val)}
            error={!!errors.current}
            helperText={errors.current}
            isCalculated={calculatedFields.has('current')}
            data-testid="current-input"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SIInput
            label={mergedLabels.resistance}
            unit="Ω"
            value={values.resistance}
            onChange={(val) => handleValueChange('resistance', val)}
            error={!!errors.resistance}
            helperText={errors.resistance}
            isCalculated={calculatedFields.has('resistance')}
            data-testid="resistance-input"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SIInput
            label={mergedLabels.power}
            unit="W"
            value={values.power}
            onChange={(val) => handleValueChange('power', val)}
            error={!!errors.power}
            helperText={errors.power}
            isCalculated={calculatedFields.has('power')}
            data-testid="power-input"
          />
        </Grid>
        {guidance && (
          <Grid item xs={12}>
            <GuidanceMessage message={mergedLabels.guidance} />
          </Grid>
        )}
      </Grid>
    );
  }
);

OhmsLawCalculator.displayName = 'OhmsLawCalculator';