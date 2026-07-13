import { logger } from './logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message: string, code: string = 'AUTH_FAILED') {
    super(message, code, 401);
    this.name = 'AuthError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, code: string = 'VALIDATION_FAILED') {
    super(message, code, 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network communication failed. Please check your connection.') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export const errorHandler = {
  parse: (error: any): AppError => {
    logger.error('Error encountered:', error);

    if (error instanceof AppError) {
      return error;
    }

    if (error && typeof error === 'object') {
      const message = error.message || error.statusText || 'An unexpected error occurred';
      const statusCode = error.status || error.statusCode || 500;
      
      if (statusCode === 401 || statusCode === 403) {
        return new AuthError(message, 'UNAUTHORIZED');
      }
      
      if (statusCode === 400) {
        return new ValidationError(message);
      }

      return new AppError(message, error.code || 'API_ERROR', statusCode);
    }

    if (typeof error === 'string') {
      return new AppError(error);
    }

    return new AppError('An unknown error occurred.');
  },

  getFriendlyMessage: (error: any): string => {
    const parsed = errorHandler.parse(error);
    return parsed.message;
  }
};
