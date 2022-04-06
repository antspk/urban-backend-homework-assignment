import { Request, Response, NextFunction } from 'express';
import { ErrorBase } from './error-base';

export function errorHandler(
  error: Error, 
  request: Request, 
  response: Response, 
  next: NextFunction
): void {
  const status = error instanceof ErrorBase ? error.code : 'INTERNAL_SERVER_ERROR';
  const httpStatus = error instanceof ErrorBase ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : `${error}`;
  
  response.status(httpStatus).json({ status, message });
}