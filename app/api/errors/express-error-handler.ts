import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';

import { config } from '../../config';
import { BaseError } from '../../domain/errors/base-error';
import { ValidationError } from './validation-error';

const SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const SERVER_ERROR_STATUS = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const SERVER_ERROR_MESSAGE = 'An unexpected error occurred';

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction): void {
  const status = error instanceof BaseError ? error.code : SERVER_ERROR_CODE;
  const httpStatus = error instanceof BaseError ? error.statusCode : SERVER_ERROR_STATUS;
  const message = status !== SERVER_ERROR_CODE ? error.message : SERVER_ERROR_MESSAGE;

  const errors = error instanceof ValidationError ? error.errors : undefined;
  const stack = config.app.debug ? error.stack?.split('\n') : undefined;

  response.status(httpStatus).json({ status, message, errors, stack });
}
