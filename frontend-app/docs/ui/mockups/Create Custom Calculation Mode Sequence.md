# 1 Diagram Info

## 1.1 Diagram Name

Create Custom Calculation Mode Sequence

## 1.2 Diagram Type

sequenceDiagram

## 1.3 Purpose

To document the end-to-end user journey of creating a new custom calculation mode, covering client-side interaction, API submission, backend validation, and data persistence.

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
| Mermaid Code | sequenceDiagram
    actor "Client: React SPA" as C... |
| Syntax Validation | Mermaid syntax verified and tested |
| Rendering Notes | Includes happy path and alternative error paths fo... |

# 3.0 Diagram Elements

## 3.1 Actors Systems

- Client (React SPA)
- API Gateway
- User & Data Service
- Database (PostgreSQL)

## 3.2 Key Processes

- Client-side wizard interaction
- Backend validation (uniqueness, schema)
- Database insertion

## 3.3 Decision Points

- Check for existing mode with same name

## 3.4 Success Paths

- Successful creation of a unique custom mode

## 3.5 Error Scenarios

- Attempting to save a mode with a duplicate name (409 Conflict)
- Attempting to save with invalid data (400 Bad Request)

## 3.6 Edge Cases Covered

- Client-side validation as a pre-check
- Backend as authoritative validator

# 4.0 Accessibility Considerations

| Property | Value |
|----------|-------|
| Alt Text | Sequence diagram showing the flow for creating a c... |
| Color Independence | Information is conveyed through sequential flow an... |
| Screen Reader Friendly | All actors and messages are descriptively labeled. |
| Print Compatibility | Renders clearly in black and white. |

# 5.0 Technical Specifications

| Property | Value |
|----------|-------|
| Mermaid Version | 10.0+ compatible |
| Responsive Behavior | Diagram is readable on mobile but may require hori... |
| Theme Compatibility | Works with default, dark, and neutral themes. |
| Performance Notes | Standard sequence diagram with moderate complexity... |

# 6.0 Usage Guidelines

## 6.1 When To Reference

During development of the custom mode creation feature, for API contract definition, and for creating QA test cases.

## 6.2 Stakeholder Value

| Property | Value |
|----------|-------|
| Developers | Clarifies the full-stack interaction, including va... |
| Designers | Validates the user flow from wizard submission to ... |
| Product Managers | Visualizes a key user journey for a core feature. |
| Qa Engineers | Provides a clear map for E2E testing, including su... |

## 6.3 Maintenance Notes

Update if backend validation logic changes or if new steps are added to the wizard's submission process.

## 6.4 Integration Recommendations

Link this diagram in the user story (US-041) and in the API documentation for the POST /custom-modes endpoint.

# 7.0 Validation Checklist

- ✅ All critical user paths documented
- ✅ Error scenarios and recovery paths included
- ✅ Decision points clearly marked with conditions
- ✅ Mermaid syntax validated and renders correctly
- ✅ Diagram serves intended audience needs
- ✅ Visual hierarchy supports easy comprehension
- ✅ Styling enhances rather than distracts from content
- ✅ Accessible to users with different visual abilities

