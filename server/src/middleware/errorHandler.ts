import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.issues,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({
    message: 'Internal server error',
  });
}
