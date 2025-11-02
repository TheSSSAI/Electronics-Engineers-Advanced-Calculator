# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-021 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Use a defined variable in a new calculation |
| As A User Story | As a registered user who performs multi-step calcu... |
| User Persona | Registered user (e.g., engineer, student, scientis... |
| Business Value | Increases user efficiency and reduces errors by al... |
| Functional Area | Core Calculator Functionality |
| Story Theme | User Data Persistence and Variables |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-001

### 3.1.2 Scenario

Using a single defined variable in a simple expression

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

I am a logged-in user and I have a previously defined variable 'width' with a value of 15

### 3.1.5 When

I enter the expression 'width * 2' into the calculator input

### 3.1.6 Then

the system correctly evaluates the expression and displays the result '30'.

### 3.1.7 Validation Notes

Verify that the parser correctly substitutes the variable 'width' with its numerical value '15' before evaluation.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-002

### 3.2.2 Scenario

Using multiple defined variables in an expression

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

I am a logged-in user and have defined variables 'length = 20' and 'height = 10'

### 3.2.5 When

I enter the expression 'length * height'

### 3.2.6 Then

the system correctly evaluates the expression and displays the result '200'.

### 3.2.7 Validation Notes

Test the parser's ability to handle multiple substitutions in a single expression.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-003

### 3.3.2 Scenario

Using a variable with built-in functions and constants

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

I am a logged-in user and have defined a variable 'radius = 5'

### 3.3.5 When

I enter the expression 'pi * radius^2'

### 3.3.6 Then

the system correctly evaluates the expression using the constant 'pi' and the variable 'radius', displaying the result '78.5398...'.

### 3.3.7 Validation Notes

Ensure that user-defined variables integrate seamlessly with the existing library of mathematical functions and constants.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-004

### 3.4.2 Scenario

Attempting to use an undefined variable

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

I am a logged-in user and do not have a variable named 'unknownVar' defined

### 3.4.5 When

I enter the expression 'unknownVar + 10'

### 3.4.6 Then

the system does not perform a calculation and instead displays a clear, non-destructive error message such as 'Error: Variable \'unknownVar\' is not defined'.

### 3.4.7 Validation Notes

The user's original input ('unknownVar + 10') must be preserved in the input field as per REQ-FRC-001.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-005

### 3.5.2 Scenario

Variable names are case-sensitive

### 3.5.3 Scenario Type

Edge_Case

### 3.5.4 Given

I am a logged-in user and have defined a variable 'myValue = 50'

### 3.5.5 When

I enter the expression 'myvalue * 2' (using incorrect casing)

### 3.5.6 Then

the system displays an undefined variable error for 'myvalue'.

### 3.5.7 Validation Notes

Confirm that the variable lookup mechanism performs a case-sensitive match.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-006

### 3.6.2 Scenario

Parser correctly distinguishes variable names from surrounding operators and numbers

### 3.6.3 Scenario Type

Edge_Case

### 3.6.4 Given

I am a logged-in user and have defined a variable 'base = 10'

### 3.6.5 When

I enter the expression '5*base-2'

### 3.6.6 Then

the system correctly evaluates the expression and displays the result '48'.

### 3.6.7 Validation Notes

The parser must correctly tokenize 'base' as the variable and not get confused by the surrounding multiplication and subtraction operators.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- Calculator input field
- Calculation result display
- Error message display area

## 4.2.0 User Interactions

- User types an expression containing a valid variable name into the input field.
- The system evaluates the expression upon pressing 'Enter' or '='.
- Optionally, as a user types a name that matches a defined variable, the text is highlighted in the input field to provide immediate feedback of recognition.

## 4.3.0 Display Requirements

- The final calculated result must be shown in the primary display.
- Error messages for undefined variables must be clear and specific, naming the variable that was not found.

## 4.4.0 Accessibility Needs

- If variable names are highlighted with color in the input field, the color contrast must meet WCAG 2.1 Level AA standards.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-002

### 5.1.2 Rule Description

User-defined variable names are case-sensitive.

### 5.1.3 Enforcement Point

During expression parsing and variable lookup.

### 5.1.4 Violation Handling

If a variable name with incorrect casing is used, it is treated as an undefined variable, and an error is shown.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-003

### 5.2.2 Rule Description

Built-in function names and constants (e.g., 'sin', 'pi') have precedence over user-defined variables of the same name.

### 5.2.3 Enforcement Point

During expression parsing.

### 5.2.4 Violation Handling

The parser will always interpret a reserved keyword as the built-in function/constant, even if a user has a variable with that name (which should be prevented by US-020).

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-020

#### 6.1.1.2 Dependency Reason

This story consumes the variables created in US-020. The ability to define and save a variable must exist before it can be used.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-053

#### 6.1.2.2 Dependency Reason

This functionality is exclusive to registered users, requiring a login system to be in place.

### 6.1.3.0 Story Id

#### 6.1.3.1 Story Id

US-055

#### 6.1.3.2 Dependency Reason

The backend persistence and retrieval mechanism for variables must be implemented for the client to fetch and use them.

## 6.2.0.0 Technical Dependencies

- The application's expression parser/evaluator.
- Frontend state management (Redux Toolkit) to hold the user's variables in a local cache for quick access.

## 6.3.0.0 Data Dependencies

- Requires access to the logged-in user's list of defined variables and their corresponding values from the backend database (`user_variables` table).

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- Variable substitution and expression evaluation should feel instantaneous to the user, completing in under 50ms on the client-side as per REQ-NFP-001.
- The user's variable list should be fetched upon login and cached locally to prevent API calls on every calculation.

## 7.2.0.0 Security

- Variable values are treated as numerical data and should not be susceptible to injection attacks. The sandboxed execution environment (REQ-CON-001) ensures this.

## 7.3.0.0 Usability

- The system should provide clear feedback when a variable is recognized (e.g., syntax highlighting) and when it is not (clear error message).

## 7.4.0.0 Accessibility

- All UI feedback (errors, highlighting) must be compliant with WCAG 2.1 Level AA standards (REQ-UI-001).

## 7.5.0.0 Compatibility

- Functionality must be consistent across all supported modern browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires modification of the core mathematical expression parser.
- The parser's tokenizer must be updated to correctly identify variable names as distinct tokens.
- Integration with the frontend state management to fetch, cache, and look up variable values.
- Robust error handling for undefined variables must be built into the parser.

## 8.3.0.0 Technical Risks

- Introducing bugs into the core parsing logic could affect all calculations, not just those with variables. Thorough regression testing is critical.
- Potential for edge cases around complex expressions where variable names might be ambiguous if not tokenized correctly (e.g., 'a-b' vs. a variable named 'a-b').

## 8.4.0.0 Integration Points

- Frontend State Management (Redux Store): To access the cached list of user variables.
- Backend API: To fetch the initial list of variables upon user login.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Verify calculations with single and multiple variables.
- Verify calculations combining variables, numbers, operators, constants, and functions.
- Verify that an error is thrown for undefined variables.
- Verify that an error is thrown for case-mismatched variable names.
- Verify that expressions without variables continue to work correctly (regression).

## 9.3.0.0 Test Data Needs

- A test user account with a pre-populated set of variables (e.g., 'x=10', 'y=20', 'rate=1.25').
- A test user account with no variables defined.

## 9.4.0.0 Testing Tools

- Jest and React Testing Library for unit/component tests.
- Cypress for end-to-end tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by at least one other developer
- Unit tests for the parser logic achieve >90% coverage
- Integration tests for the calculator component are implemented and passing
- E2E tests for variable usage scenarios are implemented and passing
- User interface changes are reviewed and approved by the design team
- Performance of client-side evaluation meets the <50ms requirement
- All code is merged into the main development branch
- Story is deployed and verified in the staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

5

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This story is blocked by US-020 and US-055. It should be scheduled in a sprint after their completion.
- The developer working on this should have a strong understanding of the existing expression parsing library.

## 11.4.0.0 Release Impact

This is a key feature for registered users and a major milestone in delivering the value of the user account system.

