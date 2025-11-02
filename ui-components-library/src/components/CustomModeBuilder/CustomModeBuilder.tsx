import React, { useState, useReducer, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  CustomMode,
  InputVariable,
  OutputVariable,
} from './CustomModeBuilder.types';
import { validateVariableName } from '../../utils/validation-rules';
import { RESERVED_KEYWORDS } from '../../utils/validation-rules';


type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'ADD_INPUT' }
  | { type: 'UPDATE_INPUT'; payload: { index: number; data: InputVariable } }
  | { type: 'REMOVE_INPUT'; payload: number }
  | { type: 'ADD_OUTPUT' }
  | { type: 'UPDATE_OUTPUT'; payload: { index: number; data: OutputVariable } }
  | { type: 'REMOVE_OUTPUT'; payload: number }
  | { type: 'UPDATE_FORMULA'; payload: string }
  | { type: 'SET_MODE'; payload: CustomMode };

const initialModeState: CustomMode = {
  name: '',
  description: '',
  inputs: [],
  outputs: [],
  formulas: '',
};

function modeReducer(state: CustomMode, action: Action): CustomMode {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_DESCRIPTION':
        return { ...state, description: action.payload };
    case 'ADD_INPUT':
        return { ...state, inputs: [...state.inputs, { name: '', unit: '' }] };
    case 'UPDATE_INPUT':
        const newInputs = [...state.inputs];
        newInputs[action.payload.index] = action.payload.data;
        return { ...state, inputs: newInputs };
    case 'REMOVE_INPUT':
        return { ...state, inputs: state.inputs.filter((_, i) => i !== action.payload) };
    case 'ADD_OUTPUT':
        return { ...state, outputs: [...state.outputs, { name: '', unit: '' }] };
    case 'UPDATE_OUTPUT':
        const newOutputs = [...state.outputs];
        newOutputs[action.payload.index] = action.payload.data;
        return { ...state, outputs: newOutputs };
    case 'REMOVE_OUTPUT':
        return { ...state, outputs: state.outputs.filter((_, i) => i !== action.payload) };
    case 'UPDATE_FORMULA':
        return { ...state, formulas: action.payload };
    case 'SET_MODE':
        return action.payload;
    default:
      return state;
  }
}

const steps = ['Details', 'Variables', 'Formulas'];

export const CustomModeBuilder: React.FC = () => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [mode, dispatch] = useReducer(modeReducer, initialModeState);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const isStepValid = (step: number) => {
        if (step === 0) {
            return mode.name.trim().length > 0;
        }
        if (step === 1) {
            const allNames = [...mode.inputs.map(i => i.name), ...mode.outputs.map(o => o.name)];
            const uniqueNames = new Set(allNames);
            if (allNames.some(name => !validateVariableName(name)) || allNames.some(name => RESERVED_KEYWORDS.has(name.toLowerCase()))) return false;
            if(uniqueNames.size !== allNames.length && allNames.length > 0) return false;
            return mode.inputs.length > 0 && mode.outputs.length > 0 && allNames.every(name => name.trim().length > 0);
        }
        // Basic check for formula presence, more complex validation would go here
        if (step === 2) {
            return mode.formulas.trim().length > 0;
        }
        return true;
    }


    const renderStepContent = (step: number) => {
        switch (step) {
            case 0: // Details
                return (
                    <Box>
                        <TextField
                            label={t('customModes.modeName')}
                            value={mode.name}
                            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label={t('customModes.descriptionOptional')}
                            value={mode.description}
                            onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                            margin="normal"
                        />
                    </Box>
                );
            case 1: // Variables
                return (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{t('customModes.inputVariables')}</Typography>
                            <List>
                                {mode.inputs.map((input, index) => (
                                    <ListItem key={index}>
                                        <TextField label={t('common.name')} value={input.name} onChange={(e) => dispatch({ type: 'UPDATE_INPUT', payload: { index, data: { ...input, name: e.target.value } } })} sx={{mr: 1}}/>
                                        <TextField label={t('common.unit')} value={input.unit} onChange={(e) => dispatch({ type: 'UPDATE_INPUT', payload: { index, data: { ...input, unit: e.target.value } } })} />
                                        <IconButton onClick={() => dispatch({type: 'REMOVE_INPUT', payload: index})}><DeleteIcon/></IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button startIcon={<AddCircleOutlineIcon/>} onClick={() => dispatch({ type: 'ADD_INPUT' })}>{t('customModes.addInput')}</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">{t('customModes.outputVariables')}</Typography>
                             <List>
                                {mode.outputs.map((output, index) => (
                                    <ListItem key={index}>
                                        <TextField label={t('common.name')} value={output.name} onChange={(e) => dispatch({ type: 'UPDATE_OUTPUT', payload: { index, data: { ...output, name: e.target.value } } })} sx={{mr: 1}}/>
                                        <TextField label={t('common.unit')} value={output.unit} onChange={(e) => dispatch({ type: 'UPDATE_OUTPUT', payload: { index, data: { ...output, unit: e.target.value } } })}/>
                                        <IconButton onClick={() => dispatch({type: 'REMOVE_OUTPUT', payload: index})}><DeleteIcon/></IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button startIcon={<AddCircleOutlineIcon/>} onClick={() => dispatch({ type: 'ADD_OUTPUT' })}>{t('customModes.addOutput')}</Button>
                        </Grid>
                    </Grid>
                );
            case 2: // Formulas
                return (
                    <Box>
                         <Typography variant="caption">
                            {t('customModes.availableVars')}: { [...mode.inputs.map(i => i.name), ...mode.outputs.map(o => o.name)].join(', ')}
                        </Typography>
                        <TextField
                            label={t('customModes.formulas')}
                            value={mode.formulas}
                            onChange={(e) => dispatch({ type: 'UPDATE_FORMULA', payload: e.target.value })}
                            fullWidth
                            multiline
                            rows={8}
                            margin="normal"
                            placeholder={t('customModes.formulaPlaceholder')}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{t(`customModes.steps.${label.toLowerCase()}`)}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 3, mb: 2, minHeight: 300 }}>
                {renderStepContent(activeStep)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    {t('common.back')}
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" onClick={() => { /* onSave(mode) */ }} disabled={!isStepValid(activeStep)}>
                        {t('common.save')}
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleNext} disabled={!isStepValid(activeStep)}>
                        {t('common.next')}
                    </Button>
                )}
            </Box>
        </Box>
    );
};