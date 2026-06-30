import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('SentryExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Report server errors (500+) to Sentry if active
    if (status >= 500 && process.env.SENTRY_DSN) {
      this.logger.warn(`Reporting 5xx Exception to Sentry: ${exception.message || exception}`);
      Sentry.withScope((scope) => {
        scope.setTag('path', request.url);
        scope.setTag('status', status.toString());
        scope.setExtra('body', request.body);
        scope.setExtra('query', request.query);
        Sentry.captureException(exception);
      });
    }

    // Delegate handling to default exception filter
    super.catch(exception, host);
  }
}
