import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { use555Timer } from '../../hooks/use555Timer';
import { SIInput } from '../shared/SIInput/SIInput';
import { WarningTooltip } from '../shared/WarningTooltip/WarningTooltip';
import type { FiveFiftyFiveTimerDesignerProps } from './FiveFiftyFiveTimerDesigner.types';

export const FiveFiftyFiveTimerDesigner: React.FC<
  FiveFiftyFiveTimerDesignerProps
> = React.memo(({ labels }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  const {
    astableState,
    handleAstableChange,
    astableResult,
    monostableState,
    handleMonostableChange,
    monostableResult,
  } = use555Timer();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  
  const defaultLabels = {
    title: t('electronics.timer555'),
    astable: t('electronics.astable'),
    monostable: t('electronics.monostable'),
    frequency: t('electronics.frequency'),
    dutyCycle: t('electronics.dutyCycle'),
    knownComponent: t('electronics.knownComponent'),
    resistorA: t('electronics.resistorA'),
    resistorB: t('electronics.resistorB'),
    capacitor: t('electronics.capacitor'),
    pulseWidth: t('electronics.pulseWidth'),
    resistor: t('electronics.resistor'),
    calculatedValues: t('electronics.calculatedValues'),
  };
  
  const mergedLabels = { ...defaultLabels, ...labels };

  const renderAstable = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t('common.inputs')}</Typography>
          <SIInput
            label={mergedLabels.frequency}
            unit="Hz"
            value={astableState.frequency}
            onChange={(val) => handleAstableChange('frequency', val)}
            margin="normal"
          />
          <SIInput
            label={mergedLabels.dutyCycle}
            unit="%"
            value={astableState.dutyCycle}
            onChange={(val) => handleAstableChange('dutyCycle', val)}
            error={!!astableResult.error}
            helperText={astableResult.error}
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">{mergedLabels.knownComponent}</FormLabel>
            <RadioGroup
              row
              name="knownComponent"
              value={astableState.knownComponent}
              onChange={(e) =>
                handleAstableChange('knownComponent', e.target.value)
              }
            >
              <FormControlLabel value="ra" control={<Radio />} label={mergedLabels.resistorA} />
              <FormControlLabel value="rb" control={<Radio />} label={mergedLabels.resistorB} />
              <FormControlLabel value="c" control={<Radio />} label={mergedLabels.capacitor} />
            </RadioGroup>
          </FormControl>
          <SIInput
            label={t('electronics.knownValue')}
            unit={astableState.knownComponent === 'c' ? 'F' : 'Ω'}
            value={astableState.knownValue}
            onChange={(val) => handleAstableChange('knownValue', val)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{mergedLabels.calculatedValues}</Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SIInput
              label={mergedLabels.resistorA}
              unit="Ω"
              value={astableResult.ra ?? ''}
              isCalculated
              readOnly
              InputProps={{
                endAdornment: astableResult.warnings?.ra ? <WarningTooltip message={astableResult.warnings.ra} /> : null
              }}
            />
            <SIInput
              label={mergedLabels.resistorB}
              unit="Ω"
              value={astableResult.rb ?? ''}
              isCalculated
              readOnly
              InputProps={{
                endAdornment: astableResult.warnings?.rb ? <WarningTooltip message={astableResult.warnings.rb} /> : null
              }}
            />
            <SIInput
              label={mergedLabels.capacitor}
              unit="F"
              value={astableResult.c ?? ''}
              isCalculated
              readOnly
              InputProps={{
                endAdornment: astableResult.warnings?.c ? <WarningTooltip message={astableResult.warnings.c} /> : null
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderMonostable = () => (
     <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t('common.inputs')}</Typography>
          <SIInput
            label={mergedLabels.pulseWidth}
            unit="s"
            value={monostableState.pulseWidth}
            onChange={(val) => handleMonostableChange('pulseWidth', val)}
            margin="normal"
          />
           <SIInput
            label={mergedLabels.resistor}
            unit="Ω"
            value={monostableState.resistance}
            onChange={(val) => handleMonostableChange('resistance', val)}
            margin="normal"
          />
           <SIInput
            label={mergedLabels.capacitor}
            unit="F"
            value={monostableState.capacitance}
            onChange={(val) => handleMonostableChange('capacitance', val)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{mergedLabels.calculatedValues}</Typography>
           <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SIInput
                label={mergedLabels.resistor}
                unit="Ω"
                value={monostableResult.resistance ?? ''}
                isCalculated
                readOnly
                 InputProps={{
                    endAdornment: monostableResult.warnings?.resistance ? <WarningTooltip message={monostableResult.warnings.resistance} /> : null
                }}
            />
            <SIInput
                label={mergedLabels.capacitor}
                unit="F"
                value={monostableResult.capacitance ?? ''}
                isCalculated
                readOnly
                InputProps={{
                    endAdornment: monostableResult.warnings?.capacitance ? <WarningTooltip message={monostableResult.warnings.capacitance} /> : null
                }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box data-testid="five-fifty-five-timer-designer">
      <Typography variant="h5" component="h2" gutterBottom>
        {mergedLabels.title}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="555 Timer Mode">
          <Tab label={mergedLabels.astable} />
          <Tab label={mergedLabels.monostable} />
        </Tabs>
      </Box>
      {tab === 0 && renderAstable()}
      {tab === 1 && renderMonostable()}
    </Box>
  );
});

FiveFiftyFiveTimerDesigner.displayName = 'FiveFiftyFiveTimerDesigner';