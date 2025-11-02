import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useResistorColorCode } from '../../hooks/useResistorColorCode';
import { SIInput } from '../shared/SIInput/SIInput';
import { ESeries, ResistorBandCount } from '../../types/electronics.types';

const ResistorBand = ({ color }: { color: string }) => (
  <Box
    sx={{
      width: '15%',
      height: 60,
      backgroundColor: color.toLowerCase(),
      border: '1px solid rgba(0,0,0,0.2)',
    }}
  />
);

export const ResistorColorCodeConverter = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  const {
    // Color to Value state and handlers
    bands,
    setBands,
    colorToValueResult,
    handleColorChange,
    availableColors,

    // Value to Color state and handlers
    value,
    setValue,
    tolerance,
    setTolerance,
    tcr,
    setTcr,
    valueToColorResult,
    suggestion,
    acceptSuggestion,
  } = useResistorColorCode();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const renderColorToValue = () => (
    <Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>{t('electronics.resistorType')}</InputLabel>
        <Select
          value={bands}
          label={t('electronics.resistorType')}
          onChange={(e: SelectChangeEvent<ResistorBandCount>) =>
            setBands(e.target.value as ResistorBandCount)
          }
        >
          <MenuItem value={3}>3-Band</MenuItem>
          <MenuItem value={4}>4-Band</MenuItem>
          <MenuItem value={5}>5-Band</MenuItem>
          <MenuItem value={6}>6-Band</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {Array.from({ length: bands }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={`band-${i}`}>
            <FormControl fullWidth>
              <InputLabel>{`${t('electronics.band')} ${i + 1}`}</InputLabel>
              <Select
                value={
                  (i === 0 && colorToValueResult.band1) ||
                  (i === 1 && colorToValueResult.band2) ||
                  (i === 2 && colorToValueResult.band3) ||
                  (i === 3 && colorToValueResult.multiplier) ||
                  (i === 4 && colorToValueResult.tolerance) ||
                  (i === 5 && colorToValueResult.tcr) ||
                  'None'
                }
                label={`${t('electronics.band')} ${i + 1}`}
                onChange={(e) => handleColorChange(i, e.target.value)}
              >
                {availableColors(i, bands).map((color) => (
                  <MenuItem key={color} value={color}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: color.toLowerCase(),
                          mr: 1,
                          border: '1px solid #ccc',
                        }}
                      />
                      {t(`electronics.colors.${color.toLowerCase()}`)}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ my: 3 }}>
        <Typography variant="h6">{t('electronics.resistanceValue')}: {colorToValueResult.value}</Typography>
        {colorToValueResult.toleranceValue && <Typography variant="h6">{t('electronics.tolerance')}: {colorToValueResult.toleranceValue}</Typography>}
        {colorToValueResult.tcrValue && <Typography variant="h6">{t('electronics.tempCo')}: {colorToValueResult.tcrValue}</Typography>}
      </Box>
    </Box>
  );

  const renderValueToColor = () => (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <SIInput
                label={t('electronics.resistanceValue')}
                unit="Ω"
                value={value}
                onChange={setValue}
            />
            {suggestion && (
                <Tooltip title={t('electronics.acceptSuggestion')}>
                <Button onClick={acceptSuggestion} variant="text" size="small">
                    {t('electronics.nearestStandardValue')}: {suggestion}
                </Button>
                </Tooltip>
            )}
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
            <InputLabel>{t('electronics.tolerance')}</InputLabel>
            <Select value={tolerance} label={t('electronics.tolerance')} onChange={(e) => setTolerance(e.target.value as ESeries)}>
                <MenuItem value={ESeries.E24}>±5% (E24)</MenuItem>
                <MenuItem value={ESeries.E12}>±10% (E12)</MenuItem>
                <MenuItem value={ESeries.E96}>±1% (E96)</MenuItem>
                <MenuItem value={ESeries.E48}>±2% (E48)</MenuItem>
            </Select>
            </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, position: 'relative', height: 60, bgcolor: 'grey.200' }}>
            <Box sx={{width: '10%', height: 4, bgcolor: 'grey.500', position: 'absolute', left: 0}} />
            <Box sx={{width: '80%', height: 40, bgcolor: '#f0e3c4', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5%'}}>
                {valueToColorResult.bands.map((color, i) => <ResistorBand key={i} color={color} />)}
            </Box>
            <Box sx={{width: '10%', height: 4, bgcolor: 'grey.500', position: 'absolute', right: 0}} />
      </Box>
    </Box>
  );

  return (
    <Box data-testid="resistor-color-code-converter">
      <Typography variant="h5" component="h2" gutterBottom>
        {t('electronics.resistorColorCode')}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="Resistor converter mode">
          <Tab label={t('electronics.colorToValue')} />
          <Tab label={t('electronics.valueToColor')} />
        </Tabs>
      </Box>
      {tab === 0 && renderColorToValue()}
      {tab === 1 && renderValueToColor()}
    </Box>
  );
};

export default ResistorColorCodeConverter;