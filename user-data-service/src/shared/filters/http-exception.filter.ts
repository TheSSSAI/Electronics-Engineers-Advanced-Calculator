import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * A global exception filter to catch all unhandled exceptions and format
 * them into a standardized RFC 7807-compliant problem details JSON response.
 * This ensures consistent error handling across the entire API.
 *
 * This filter is applied globally in `main.ts`.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * The main method that processes the exception.
   * @param exception The thrown exception object.
   * @param host The context for the request and response.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = this.buildErrorResponse(exception, status, request);

    if (status >= 500) {
      this.logger.error(
        {
          message: `Unhandled Exception: ${errorResponse.detail}`,
          path: request.url,
          method: request.method,
          exception: exception,
          stack: (exception as Error).stack,
        },
        (exception as Error).stack,
        'HttpExceptionFilter',
      );
    } else {
      this.logger.warn(
        {
          message: `Handled Exception: ${errorResponse.detail}`,
          path: request.url,
          method: request.method,
          response: errorResponse,
        },
        'HttpExceptionFilter',
      );
    }

    response.status(status).json(errorResponse);
  }

  /**
   * Builds the standardized RFC 7807 problem details object.
   * @param exception The original exception.
   * @param status The resolved HTTP status code.
   * @param request The incoming request object.
   * @returns A structured error response object.
   */
  private buildErrorResponse(
    exception: unknown,
    status: number,
    request: Request,
  ) {
    let title: string;
    let detail: string | object;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      title = this.getTitleForStatus(status);

      if (typeof response === 'string') {
        detail = response;
      } else if (response && typeof response === 'object') {
        // Handle class-validator responses which are nested
        detail = (response as any).message || 'Validation failed';
      } else {
        detail = exception.message;
      }
    } else {
      title = 'Internal Server Error';
      detail =
        process.env.NODE_ENV === 'production'
          ? 'An unexpected error occurred on the server.'
          : (exception as Error).message;
    }

    return {
      type: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${status}`,
      title,
      status,
      detail,
      instance: request.url,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Provides a default title for a given HTTP status code.
   * @param status The HTTP status code.
   * @returns A human-readable title.
   */
  private getTitleForStatus(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Unprocessable Entity';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'Service Unavailable';
      default:
        return 'Error';
    }
  }
}