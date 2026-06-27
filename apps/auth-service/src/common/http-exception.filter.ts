import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<any>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.message
      : 'Internal server error occurred';

    const exceptionResponse = exception instanceof HttpException
      ? exception.getResponse()
      : null;

    const details = typeof exceptionResponse === 'object' && exceptionResponse !== null
      ? (exceptionResponse as any).message || exceptionResponse
      : {};

    const requestId = request.headers['x-request-id'] || `req_${Math.random().toString(36).substring(2, 10)}`;

    response.status(status).json({
      success: false,
      error: {
        code: exception.code || 'HTTP_ERROR',
        message: Array.isArray(details) ? details.join(', ') : message,
        details: Array.isArray(details) ? { validationErrors: details } : details,
      },
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
