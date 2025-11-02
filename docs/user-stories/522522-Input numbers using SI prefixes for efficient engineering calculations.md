# 1 Story Metadata

| Property | Value |
|----------|-------|
| Story Id | US-014 |
| Elaboration Date | 2025-01-15 |
| Development Readiness | Complete |

# 2 Story Narrative

| Property | Value |
|----------|-------|
| Title | Input numbers using SI prefixes for efficient engi... |
| As A User Story | As an electronics engineer, I want to input numeri... |
| User Persona | Scientific or electronics professional, student, o... |
| Business Value | Enhances user efficiency and reduces input errors ... |
| Functional Area | Core Calculator Functionality |
| Story Theme | Advanced Input Methods |

# 3 Acceptance Criteria

## 3.1 Criteria Id

### 3.1.1 Criteria Id

AC-014-001

### 3.1.2 Scenario

Correctly parse large-magnitude SI prefixes within an expression

### 3.1.3 Scenario Type

Happy_Path

### 3.1.4 Given

The user is entering an expression in the calculator input

### 3.1.5 When

The user types the expression '1.2k + 3M + 0.5G'

### 3.1.6 Then

The system correctly calculates the result as 503001200.

### 3.1.7 Validation Notes

Verify that '1.2k' is parsed as 1200, '3M' as 3000000, and '0.5G' as 500000000. The final sum must be correct.

## 3.2.0 Criteria Id

### 3.2.1 Criteria Id

AC-014-002

### 3.2.2 Scenario

Correctly parse small-magnitude SI prefixes within an expression

### 3.2.3 Scenario Type

Happy_Path

### 3.2.4 Given

The user is entering an expression in the calculator input

### 3.2.5 When

The user types the expression '500m + 10μ + 2.5n + 99p'

### 3.2.6 Then

The system correctly calculates the result as 0.500010002500099.

### 3.2.7 Validation Notes

Verify that '500m' is 0.5, '10μ' is 0.00001, '2.5n' is 2.5e-9, and '99p' is 9.9e-11. The final sum must be correct.

## 3.3.0 Criteria Id

### 3.3.1 Criteria Id

AC-014-003

### 3.3.2 Scenario

SI prefixes are correctly interpreted inside function calls

### 3.3.3 Scenario Type

Happy_Path

### 3.3.4 Given

The user is entering an expression in the calculator input

### 3.3.5 When

The user types the expression 'sqrt(4k)'

### 3.3.6 Then

The system correctly calculates the result as approximately 63.24555.

### 3.3.7 Validation Notes

Verify that '4k' is parsed as 4000 before the square root function is applied.

## 3.4.0 Criteria Id

### 3.4.1 Criteria Id

AC-014-004

### 3.4.2 Scenario

System rejects invalid case for SI prefixes

### 3.4.3 Scenario Type

Error_Condition

### 3.4.4 Given

The user is entering an expression in the calculator input

### 3.4.5 When

The user types an expression with an incorrect case for a prefix, such as '10K' or '5milli'

### 3.4.6 Then

The system displays a non-destructive syntax error message, preserving the user's input.

### 3.4.7 Validation Notes

Test with 'K' (should be 'k'), 'g' (should be 'G'), and other incorrect cases. The parser must not interpret these as valid prefixes.

## 3.5.0 Criteria Id

### 3.5.1 Criteria Id

AC-014-005

### 3.5.2 Scenario

System rejects space between number and SI prefix

### 3.5.3 Scenario Type

Error_Condition

### 3.5.4 Given

The user is entering an expression in the calculator input

### 3.5.5 When

The user types an expression with a space, such as '10 k'

### 3.5.6 Then

The system displays a non-destructive syntax error message.

### 3.5.7 Validation Notes

The parser must treat '10' and 'k' as separate tokens, which should result in a syntax error if 'k' is not a defined variable.

## 3.6.0 Criteria Id

### 3.6.1 Criteria Id

AC-014-006

### 3.6.2 Scenario

System rejects invalid or multiple prefixes on a single number

### 3.6.3 Scenario Type

Error_Condition

### 3.6.4 Given

The user is entering an expression in the calculator input

### 3.6.5 When

The user types an expression with an invalid prefix like '10x' or multiple prefixes like '1kk'

### 3.6.6 Then

The system displays a non-destructive syntax error message.

### 3.6.7 Validation Notes

The parser must only recognize the specific prefixes defined in REQ-FRC-001 and REQ-BIZ-001.

## 3.7.0 Criteria Id

### 3.7.1 Criteria Id

AC-014-007

### 3.7.2 Scenario

System rejects prefix not appended to a number

### 3.7.3 Scenario Type

Error_Condition

### 3.7.4 Given

The user is entering an expression in the calculator input

### 3.7.5 When

The user types an expression where a prefix is not immediately preceded by a number, such as 'k10' or '10 + k'

### 3.7.6 Then

The system displays a non-destructive syntax error message (unless 'k' is a defined variable, in which case the second example is valid).

### 3.7.7 Validation Notes

Test with a prefix at the beginning of an expression or after an operator. The parser should identify this as invalid syntax for a numeric literal.

# 4.0.0 User Interface Requirements

## 4.1.0 Ui Elements

- The main calculator input field.
- A button for the 'μ' symbol should be available on the calculator keypad for easy access.

## 4.2.0 User Interactions

- User types a number followed immediately by a valid SI prefix character.
- The input field displays the literal text typed by the user (e.g., '10k').

## 4.3.0 Display Requirements

- The result of the calculation is displayed in the main result panel.
- In case of a parsing error related to an invalid prefix, a clear error message is shown without clearing the user's input, as per REQ-FRC-001.

## 4.4.0 Accessibility Needs

- The 'μ' button must have an appropriate ARIA label, such as 'micro prefix'.

# 5.0.0 Business Rules

## 5.1.0 Rule Id

### 5.1.1 Rule Id

BR-014-001

### 5.1.2 Rule Description

Supported SI prefixes are p, n, μ, m, k, M, G, as defined in REQ-FRC-001.

### 5.1.3 Enforcement Point

Expression Parser/Lexer

### 5.1.4 Violation Handling

Any character appended to a number that is not in this list is considered a syntax error.

## 5.2.0 Rule Id

### 5.2.1 Rule Id

BR-014-002

### 5.2.2 Rule Description

SI prefixes are case-sensitive, as defined in REQ-BIZ-001.

### 5.2.3 Enforcement Point

Expression Parser/Lexer

### 5.2.4 Violation Handling

A number followed by a prefix with incorrect casing (e.g., '1K') is a syntax error.

## 5.3.0 Rule Id

### 5.3.1 Rule Id

BR-014-003

### 5.3.2 Rule Description

SI prefixes must be appended directly to a number with no space, as defined in REQ-BIZ-001.

### 5.3.3 Enforcement Point

Expression Parser/Lexer

### 5.3.4 Violation Handling

A space between a number and a valid prefix character will cause the prefix to be treated as a separate token, likely resulting in a syntax error.

# 6.0.0 Dependencies

## 6.1.0 Prerequisite Stories

### 6.1.1 Story Id

#### 6.1.1.1 Story Id

US-001

#### 6.1.1.2 Dependency Reason

Requires the core arithmetic expression evaluation engine to be functional.

### 6.1.2.0 Story Id

#### 6.1.2.1 Story Id

US-024

#### 6.1.2.2 Dependency Reason

Requires the non-destructive error messaging system to be in place.

## 6.2.0.0 Technical Dependencies

- The client-side expression parsing library/module.

## 6.3.0.0 Data Dependencies

*No items available*

## 6.4.0.0 External Dependencies

*No items available*

# 7.0.0.0 Non Functional Requirements

## 7.1.0.0 Performance

- The parsing of SI prefixes must not introduce any noticeable latency. The overall client-side calculation must remain under the 50ms threshold specified in REQ-NFP-001.

## 7.2.0.0 Security

*No items available*

## 7.3.0.0 Usability

- The feature should feel intuitive to users familiar with scientific calculators.
- The inclusion of a 'μ' button on the UI is critical for usability as it's not a standard keyboard character.

## 7.4.0.0 Accessibility

*No items available*

## 7.5.0.0 Compatibility

- The feature must work consistently across all supported browsers (Chrome, Firefox, Safari, Edge) as per REQ-ENV-001.

# 8.0.0.0 Implementation Considerations

## 8.1.0.0 Complexity Assessment

Medium

## 8.2.0.0 Complexity Factors

- Requires modification of the core expression parser's tokenizer/lexer.
- Logic must be robust to differentiate between prefixes and potential variable names.
- Careful handling of floating-point arithmetic is required for small-magnitude prefixes.

## 8.3.0.0 Technical Risks

- If using a third-party parsing library, it may not support custom tokenization, requiring a workaround or a different library.
- Introducing ambiguity into the grammar could lead to unexpected parsing bugs.

## 8.4.0.0 Integration Points

- Tightly integrated with the calculator's input processing and evaluation engine.

# 9.0.0.0 Testing Requirements

## 9.1.0.0 Testing Types

- Unit
- Integration
- E2E

## 9.2.0.0 Test Scenarios

- Unit tests for the tokenizer/parser logic for each valid prefix.
- Unit tests for all identified error conditions (case, spacing, invalid characters).
- Integration tests combining SI prefixes with all arithmetic operators, parentheses, and mathematical functions.
- E2E tests simulating user input of complex expressions and verifying the final displayed result.

## 9.3.0.0 Test Data Needs

- A comprehensive list of expressions with expected outcomes, including integers, decimals, and combinations of prefixes.

## 9.4.0.0 Testing Tools

- Jest for unit/integration tests.
- Cypress for E2E tests.

# 10.0.0.0 Definition Of Done

- All acceptance criteria validated and passing
- Code reviewed and approved by team
- Unit tests implemented for the parsing logic with at least 90% coverage
- Integration testing completed successfully for combined expressions
- User interface reviewed and approved, including the 'μ' button
- Performance requirements verified to be within limits
- Security requirements validated
- Documentation updated to include information on supported SI prefixes in the in-app help system
- Story deployed and verified in staging environment

# 11.0.0.0 Planning Information

## 11.1.0.0 Story Points

3

## 11.2.0.0 Priority

🔴 High

## 11.3.0.0 Sprint Considerations

- This is a foundational feature for the target user base and should be prioritized early after the basic calculator is functional.
- The availability of a 'μ' button on the UI keypad is a design dependency.

## 11.4.0.0 Release Impact

- Significantly improves the usability and professional appeal of the calculator.

