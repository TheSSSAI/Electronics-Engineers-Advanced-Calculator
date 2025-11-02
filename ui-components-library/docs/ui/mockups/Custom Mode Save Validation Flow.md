# 1 Diagram Info

## 1.1 Diagram Name

Custom Mode Save Validation Flow

## 1.2 Diagram Type

flowchart

## 1.3 Purpose

To document the complete validation sequence and error handling paths when a user attempts to save a new or edited custom calculation mode, covering both client-side and server-side checks.

## 1.4 Target Audience

- developers
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
    subgraph User Action
        A[Us... |
| Syntax Validation | Mermaid syntax verified and tested |
| Rendering Notes | The diagram uses subgraphs to logically group acti... |

# 3.0 Diagram Elements

## 3.1 Actors Systems

- User
- Frontend Client
- Backend API
- Database

## 3.2 Key Processes

- Client-Side Validation
- API Request
- Server-Side Validation
- Database Write
- User Feedback Loop

## 3.3 Decision Points

- Is name valid?
- Are formulas valid?
- Is name unique?
- Was database save successful?

## 3.4 Success Paths

- All validations pass, mode is saved, user is notified and redirected.

## 3.5 Error Scenarios

- Invalid name format or reserved keyword.
- Invalid formula syntax or undefined variable reference.
- A mode with the same name already exists for the user.
- A generic server or database error occurs during the save operation.

## 3.6 Edge Cases Covered

- Client-side checks pass but server-side checks fail (e.g., race condition on name uniqueness).

# 4.0 Accessibility Considerations

| Property | Value |
|----------|-------|
| Alt Text | A flowchart detailing the validation process for s... |
| Color Independence | Information is conveyed through node text, shapes ... |
| Screen Reader Friendly | All nodes and paths have clear, descriptive text l... |
| Print Compatibility | Diagram uses distinct shapes and high-contrast tex... |

# 5.0 Technical Specifications

| Property | Value |
|----------|-------|
| Mermaid Version | 10.0+ compatible |
| Responsive Behavior | Diagram scales well and remains readable on both m... |
| Theme Compatibility | Node styling is defined with specific fill and str... |
| Performance Notes | The diagram is of low-to-medium complexity and ren... |

# 6.0 Usage Guidelines

## 6.1 When To Reference

During development or testing of the custom mode creation/editing feature (US-041, US-048). Essential for understanding the full scope of validation logic.

## 6.2 Stakeholder Value

| Property | Value |
|----------|-------|
| Developers | Provides a clear specification for both frontend a... |
| Designers | Validates the user feedback loop for different err... |
| Product Managers | Clarifies all business rules and failure condition... |
| Qa Engineers | Serves as a complete map of test cases for validat... |

## 6.3 Maintenance Notes

Update this diagram if new validation rules are added to the custom mode creation process.

## 6.4 Integration Recommendations

Embed this diagram directly in the user stories for creating (US-041) and editing (US-048) custom modes.

# 7.0 Validation Checklist

- ✅ All critical user paths documented
- ✅ Error scenarios and recovery paths included
- ✅ Decision points clearly marked with conditions
- ✅ Mermaid syntax validated and renders correctly
- ✅ Diagram serves intended audience needs
- ✅ Visual hierarchy supports easy comprehension
- ✅ Styling enhances rather than distracts from content
- ✅ Accessible to users with different visual abilities

