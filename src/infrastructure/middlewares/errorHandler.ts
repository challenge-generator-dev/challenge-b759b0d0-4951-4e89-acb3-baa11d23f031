import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError } from 'class-validator';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: Array<{
    field: string;
    messages: string[];
  }>;
  timestamp?: string;
  path?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request') {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof AppError) {
    const response: ErrorResponse = {
      statusCode: err.statusCode,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err.name === 'ValidationError') {
    const validationErrors = err as ValidationError;
    const formattedErrors = Object.values(validationErrors.constraints || {}).map(
      (message, index) => ({
        field: validationErrors.property || `error_${index}`,
        messages: [message],
      })
    );

    const response: ErrorResponse = {
      statusCode: 400,
      message: 'Validation failed',
      errors: formattedErrors,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(400).json(response);
    return;
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    const response: ErrorResponse = {
      statusCode: 401,
      message: 'Unauthorized access',
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(401).json(response);
    return;
  }

  if (err.code === 'ConditionalCheckFailedException') {
    const response: ErrorResponse = {
      statusCode: 409,
      message: 'Resource already exists or condition not met',
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(409).json(response);
    return;
  }

  if (err.code === 'ResourceNotFoundException') {
    const response: ErrorResponse = {
      statusCode: 404,
      message: 'Resource not found in database',
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(404).json(response);
    return;
  }

  const response: ErrorResponse = {
    statusCode: 500,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  res.status(500).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ErrorResponse = {
    statusCode: 404,
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
    path: req.path,
  };
  res.status(404).json(response);
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  });
  
  next();
};