// =================================================================================
//  Public API of the @calculator/ui-components library
// =================================================================================
// This file serves as the main entry point for the library, re-exporting
// all public components, types, and utilities that consuming applications
// can import. Internal implementation details (like custom hooks) are not
// exposed here to maintain a clean and stable public API.
// =================================================================================

// ---------------------------------------------------------------------------------
//  1. Feature Components
// ---------------------------------------------------------------------------------
// These are the main, complex components that encapsulate the application's
// specialized features.
// ---------------------------------------------------------------------------------

export { default as OhmsLawCalculator } from './components/OhmsLawCalculator/OhmsLawCalculator';
export { default as ResistorCombinationsCalculator } from './components/ResistorCombinationsCalculator/ResistorCombinationsCalculator';
export { default as ResistorColorCodeConverter } from './components/ResistorColorCodeConverter/ResistorColorCodeConverter';
export { default as FiveFiftyFiveTimerDesigner } from './components/FiveFiftyFiveTimerDesigner/FiveFiftyFiveTimerDesigner';
export { default as CustomModeBuilder } from './components/CustomModeBuilder/CustomModeBuilder';


// ---------------------------------------------------------------------------------
//  2. Shared Components
// ---------------------------------------------------------------------------------
// These are the shared, atomic/molecular components used by the feature components.
// They are exported to allow consuming applications to build consistent UIs.
// ---------------------------------------------------------------------------------

export { default as SIInput } from './components/shared/SIInput/SIInput';
export { default as GuidanceMessage } from './components/shared/GuidanceMessage/GuidanceMessage';
export { default as WarningTooltip } from './components/shared/WarningTooltip/WarningTooltip';


// ---------------------------------------------------------------------------------
//  3. Component Prop Types
// ---------------------------------------------------------------------------------
// Exporting the props interfaces for each component is crucial for a strongly-typed
// API in a TypeScript environment.
// ---------------------------------------------------------------------------------

export * from './components/OhmsLawCalculator/OhmsLawCalculator.types';
export * from './components/ResistorCombinationsCalculator/ResistorCombinationsCalculator.types';
export * from './components/ResistorColorCodeConverter/ResistorColorCodeConverter.types';
export * from './components/FiveFiftyFiveTimerDesigner/FiveFiftyFiveTimerDesigner.types';
export * from './components/CustomModeBuilder/CustomModeBuilder.types';
export * from './components/shared/SIInput/SIInput.types';
export * from './components/shared/GuidanceMessage/GuidanceMessage.types';
export * from './components/shared/WarningTooltip/WarningTooltip.types';


// ---------------------------------------------------------------------------------
//  4. Shared Core Types
// ---------------------------------------------------------------------------------
// These are foundational types used throughout the library's props and internal
// logic. Exporting them allows consumers to work with the same data structures.
// ---------------------------------------------------------------------------------

export * from './types/common.types';
export * from './types/electronics.types';


// ---------------------------------------------------------------------------------
//  5. Theme & Styling
// ---------------------------------------------------------------------------------
// The MUI theme is exported to allow consuming applications to either use it
// directly or extend it for a consistent look and feel.
// ---------------------------------------------------------------------------------

export { default as theme } from './styles/theme';