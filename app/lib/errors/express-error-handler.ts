import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { ErrorBase } from './error-base';

export function errorHandler(
  error: Error, 
  request: Request, 
  response: Response, 
  next: NextFunction
): void {
  const status = error instanceof ErrorBase ? error.code : 'INTERNAL_SERVER_ERROR';
  const httpStatus = error instanceof ErrorBase ? error.statusCode : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = error instanceof Error ? error.message : `An unexpected error occurred`;
  
  response.status(httpStatus).json({ status, message });
}