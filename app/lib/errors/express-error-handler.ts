import { Request, Response, NextFunction } from 'express';
import { constants } from 'http2';
import { ErrorBase } from './error-base';

const SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const SERVER_ERROR_STATUS = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const SERVER_ERROR_MESSAGE = 'An unexpected error occurred';

export function errorHandler(
  error: Error, 
  request: Request, 
  response: Response, 
  next: NextFunction
): void {
  const status = error instanceof ErrorBase ? error.code : SERVER_ERROR_CODE;
  const httpStatus = error instanceof ErrorBase ? error.statusCode : SERVER_ERROR_STATUS;
  const message = status !== SERVER_ERROR_CODE ? error.message : SERVER_ERROR_MESSAGE;
  
  response.status(httpStatus).json({ status, message });
}