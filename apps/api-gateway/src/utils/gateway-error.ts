import { HttpStatus } from '@nestjs/common';

export interface RichErrorPayload {
  success: false;
  error: {
    message: string;
    service: string;
    endpoint: string;
    status: number;
    timeout: number;
    duration: string;
    requestId: string;
    originalException: string;
    responseBody: string;
    stack?: string;
  };
  message: string;
}

export function handleGatewayError(
  err: any,
  service: string,
  endpoint: string,
  startTimestamp: number,
  response?: Response,
  responseBody?: string
): RichErrorPayload {
  const duration = Date.now() - startTimestamp;
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const status = response ? response.status : HttpStatus.BAD_GATEWAY;

  const errMsg = err.message || 'Service communication failure';
  const richError: RichErrorPayload = {
    success: false,
    error: {
      message: errMsg,
      service,
      endpoint,
      status,
      timeout: 90000,
      duration: `${duration}ms`,
      requestId,
      originalException: err.name || 'Error',
      responseBody: responseBody || (response ? `HTTP Status ${response.status} (${response.statusText})` : 'Service unreachable'),
      stack: err.stack
    },
    message: `Gateway fetch failed on service [${service}] at endpoint [${endpoint}]: ${errMsg} (Duration: ${duration}ms, Req ID: ${requestId})`
  };

  console.error(`[API_GATEWAY_ERROR] [${requestId}] [${service}] ${endpoint} failed after ${duration}ms:`, err);
  return richError;
}
