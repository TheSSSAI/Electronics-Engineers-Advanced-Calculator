import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useResistorCalculations } from '../../hooks/useResistorCalculations';
import { SIInput } from '../shared/SIInput/SIInput';
import { formatNumber } from '../../utils/number-formatter';
import type { ResistorCombinationsCalculatorProps } from './ResistorCombinationsCalculator.types';

export const ResistorCombinationsCalculator: React.FC<
  ResistorCombinationsCalculatorProps
> = React.memo(({ labels }) => {
  const { t } = useTranslation();
  const {
    resistors,
    addResistor,
    editResistor,
    removeResistor,
    calculateSeries,
    calculateParallel,
    clearResistors,
  } = useResistorCalculations();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [seriesResult, setSeriesResult] = useState<number | null>(null);
  const [parallelResult, setParallelResult] = useState<number | null>(null);

  const defaultLabels = {
    title: t('electronics.resistorCombinations'),
    addResistor: t('electronics.addResistor'),
    resistorValue: t('electronics.resistorValue'),
    calculateSeries: t('electronics.calculateSeries'),
    calculateParallel: t('electronics.calculateParallel'),
    totalSeries: t('electronics.totalSeries'),
    totalParallel: t('electronics.totalParallel'),
    reset: t('common.reset'),
    resistorList: t('electronics.resistorList'),
  };

  const mergedLabels = { ...defaultLabels, ...labels };

  const handleAdd = () => {
    const errorMsg = addResistor(inputValue);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setInputValue('');
      setError('');
      setSeriesResult(null);
      setParallelResult(null);
    }
  };

  const handleEdit = (index: number) => {
    const errorMsg = editResistor(index, editingValue);
    if (errorMsg) {
      // Potentially show error in edit mode
    } else {
      setEditingIndex(null);
      setEditingValue('');
      setSeriesResult(null);
      setParallelResult(null);
    }
  };

  const handleCalculateSeries = () => {
    setSeriesResult(calculateSeries());
  };

  const handleCalculateParallel = () => {
    setParallelResult(calculateParallel());
  };
  
  const handleReset = () => {
    clearResistors();
    setInputValue('');
    setError('');
    setSeriesResult(null);
    setParallelResult(null);
  };

  return (
    <Box data-testid="resistor-combinations-calculator">
      <Typography variant="h5" component="h2" gutterBottom>
        {mergedLabels.title}
      </Typography>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
            sx={{ display: 'flex', gap: 1, mb: 2 }}
          >
            <SIInput
              label={mergedLabels.resistorValue}
              unit="Ω"
              value={inputValue}
              onChange={setInputValue}
              error={!!error}
              helperText={error}
              fullWidth
            />
            <Button type="submit" variant="contained">
              {mergedLabels.addResistor}
            </Button>
          </Box>
          <Typography variant="h6" gutterBottom>
            {mergedLabels.resistorList} ({resistors.length})
          </Typography>
          <List sx={{ maxHeight: 300, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            {resistors.map((resistor, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  editingIndex === index ? (
                    <>
                      <IconButton edge="end" aria-label="save" onClick={() => handleEdit(index)}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="cancel" onClick={() => setEditingIndex(null)}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => { setEditingIndex(index); setEditingValue(resistor.toString()); }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => removeResistor(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
              >
                {editingIndex === index ? (
                  <TextField 
                    value={editingValue} 
                    onChange={(e) => setEditingValue(e.target.value)} 
                    variant="standard" 
                    autoFocus
                  />
                ) : (
                  <ListItemText primary={`${formatNumber(resistor)} Ω`} />
                )}
              </ListItem>
            ))}
             {resistors.length === 0 && (
              <ListItem>
                <ListItemText secondary={t('electronics.addResistorsToBegin')} />
              </ListItem>
            )}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              onClick={handleCalculateSeries}
              variant="outlined"
              disabled={resistors.length === 0}
            >
              {mergedLabels.calculateSeries}
            </Button>
            {seriesResult !== null && (
              <Typography variant="h6">
                {mergedLabels.totalSeries}: {formatNumber(seriesResult)} Ω
              </Typography>
            )}
            <Button
              onClick={handleCalculateParallel}
              variant="outlined"
              disabled={resistors.length === 0}
            >
              {mergedLabels.calculateParallel}
            </Button>
            {parallelResult !== null && (
              <Typography variant="h6">
                {mergedLabels.totalParallel}: {formatNumber(parallelResult)} Ω
              </Typography>
            )}
             <Button
              onClick={handleReset}
              variant="text"
              color="secondary"
              sx={{ mt: 2 }}
            >
              {mergedLabels.reset}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

ResistorCombinationsCalculator.displayName = 'ResistorCombinationsCalculator';