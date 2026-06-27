import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseEnvelope<T> {
  success: boolean;
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseEnvelope<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseEnvelope<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const requestId = request.headers['x-request-id'] || `req_${Math.random().toString(36).substring(2, 10)}`;

    return next.handle().pipe(
      map((data) => {
        // If data is already structured, return it directly. Otherwise envelope it.
        if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
          return data;
        }

        return {
          success: true,
          data: data || {},
          meta: {
            requestId,
            timestamp: new Date().toISOString(),
          },
        };
      })
    );
  }
}
