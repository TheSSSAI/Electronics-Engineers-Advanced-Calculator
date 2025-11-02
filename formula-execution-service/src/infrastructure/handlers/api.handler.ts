import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ExecuteFormulaUseCase } from '../../application/use-cases/execute-formula.use-case';
import { IsolatedVmSandboxService } from '../services/isolated-vm.sandbox.service';
import { ExecuteFormulaCommand } from '../../application/dtos/execute-formula.dto';
import { ExecutionError } from '../../application/errors/execution.error';

// A lightweight logger that can be expanded later.
// For now, it respects the structured logging requirement.
const createLogger = (correlationId: string) => ({
  info: (message: string, data?: object) => {
    console.log(JSON.stringify({ level: 'info', message, correlationId, ...data }));
  },
  error: (message: string, error?: any, data?: object) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      correlationId, 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      ...data 
    }));
  },
});

// Centralized response formatting
const createResponse = (statusCode: number, body: object, correlationId: string): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // TODO: Restrict in production
      'Access-Control-Allow-Credentials': true,
      'X-Correlation-ID': correlationId,
    },
    body: JSON.stringify(body),
  };
};

// Instantiate dependencies outside the handler for potential reuse across warm invocations.
// This is a simple form of dependency injection suitable for this Lambda's scope.
const sandboxService = new IsolatedVmSandboxService();
const executeFormulaUseCase = new ExecuteFormulaUseCase(sandboxService);

/**
 * AWS Lambda handler function for executing user-defined formulas.
 * This function serves as the adapter between the AWS API Gateway event and the application's core logic.
 *
 * @param event The API Gateway proxy event.
 * @param context The Lambda execution context.
 * @returns A promise that resolves to an API Gateway proxy result.
 */
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const correlationId = event.headers['x-correlation-id'] || event.requestContext.requestId || context.awsRequestId;
  const logger = createLogger(correlationId);

  logger.info('Formula execution request received.', {
    path: event.path,
    httpMethod: event.httpMethod,
  });

  try {
    if (!event.body) {
      logger.error('Request body is missing.');
      return createResponse(400, { error: 'Request body is missing.' }, correlationId);
    }

    let parsedBody: any;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (parseError) {
      logger.error('Failed to parse request body as JSON.', { error: parseError });
      return createResponse(400, { error: 'Invalid JSON format in request body.' }, correlationId);
    }

    // Basic DTO validation
    if (
      !parsedBody ||
      typeof parsedBody.formula !== 'string' ||
      parsedBody.formula.trim() === '' ||
      typeof parsedBody.context !== 'object' ||
      parsedBody.context === null ||
      Array.isArray(parsedBody.context)
    ) {
      const validationError = 'Invalid input: "formula" must be a non-empty string and "context" must be an object.';
      logger.error(validationError, { receivedBody: parsedBody });
      return createResponse(422, { error: validationError }, correlationId);
    }

    const command: ExecuteFormulaCommand = {
      formula: parsedBody.formula,
      context: parsedBody.context,
    };

    logger.info('Invoking ExecuteFormulaUseCase.');
    const result = await executeFormulaUseCase.execute(command);

    if (result.isSuccess) {
      logger.info('Formula execution successful.');
      return createResponse(200, { result: result.value }, correlationId);
    } else {
      logger.error('Formula execution failed with a controlled error.', { error: result.error });
      // These are user-facing errors (e.g., syntax, timeout), so a 400 is appropriate.
      return createResponse(400, { error: result.error }, correlationId);
    }
  } catch (error) {
    logger.error('An unexpected error occurred in the handler.', { error });

    // Handle specific application errors if they bubble up
    if (error instanceof ExecutionError) {
        return createResponse(400, { error: error.message }, correlationId);
    }
    
    // Fallback for any other unexpected errors
    return createResponse(500, { error: 'An internal server error occurred.' }, correlationId);
  }
};