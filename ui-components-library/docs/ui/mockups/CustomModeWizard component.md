# 1 Diagram Info

## 1.1 Diagram Name

CustomModeWizard component

## 1.2 Diagram Type

flowchart

## 1.3 Purpose

To visualize the multi-step user flow for creating a new custom calculation mode, including user actions, validation points, and success/error paths.

## 1.4 Target Audience

- developers
- designers
- QA engineers
- product managers

## 1.5 Complexity Level

medium

## 1.6 Estimated Review Time

3-5 minutes

# 2.0 Mermaid Implementation

| Property | Value |
|----------|-------|
| Mermaid Code | flowchart TD
    subgraph Legend
        direction... |
| Syntax Validation | Mermaid syntax verified and tested |
| Rendering Notes | Optimized for both light and dark themes. Uses a l... |

# 3.0 Diagram Elements

## 3.1 Actors Systems

- User
- Frontend (React App)
- Backend (API)

## 3.2 Key Processes

- Wizard Navigation
- Real-time Validation
- State Management
- API Submission

## 3.3 Decision Points

- Name validation (uniqueness, format)
- Variable count validation (min 1 input, 1 output)
- Formula syntax validation
- API response handling (success/error)
- Cancel confirmation

## 3.4 Success Paths

- User successfully completes all steps and saves the new custom mode.

## 3.5 Error Scenarios

- User enters an invalid or duplicate name.
- User does not define the minimum required variables.
- User writes a formula with a syntax error.
- Backend API returns an error during the save operation.

## 3.6 Edge Cases Covered

- User canceling the wizard at any step.

# 4.0 Accessibility Considerations

| Property | Value |
|----------|-------|
| Alt Text | A flowchart detailing the user journey for the Cus... |
| Color Independence | Information is conveyed through node shapes, text,... |
| Screen Reader Friendly | All nodes have clear, descriptive text labels that... |
| Print Compatibility | Diagram uses distinct shapes and clear text, makin... |

# 5.0 Technical Specifications

| Property | Value |
|----------|-------|
| Mermaid Version | 10.0+ compatible |
| Responsive Behavior | Mermaid's default SVG scaling ensures the diagram ... |
| Theme Compatibility | Styling is defined with `classDef` and should be c... |
| Performance Notes | The diagram is of medium complexity and should ren... |

# 6.0 Usage Guidelines

## 6.1 When To Reference

During the development, testing, or review of the custom mode creation feature (US-041, US-042, US-043). Useful for onboarding new developers to the feature.

## 6.2 Stakeholder Value

| Property | Value |
|----------|-------|
| Developers | Provides a clear visual guide for component state ... |
| Designers | Validates the intended user journey and interactio... |
| Product Managers | Offers a concise overview of the entire feature fl... |
| Qa Engineers | Serves as a blueprint for creating end-to-end test... |

## 6.3 Maintenance Notes

Update this diagram if new steps are added to the wizard, or if the validation logic at any step changes significantly.

## 6.4 Integration Recommendations

Embed this diagram directly in the user stories (US-041) and in the frontend component's developer documentation.

# 7.0 Validation Checklist

- ✅ All critical user paths documented
- ✅ Error scenarios and recovery paths included
- ✅ Decision points clearly marked with conditions
- ✅ Mermaid syntax validated and renders correctly
- ✅ Diagram serves intended audience needs
- ✅ Visual hierarchy supports easy comprehension
- ✅ Styling enhances rather than distracts from content
- ✅ Accessible to users with different visual abilities

