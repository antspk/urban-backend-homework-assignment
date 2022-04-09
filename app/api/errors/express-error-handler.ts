import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';

import { config } from '../../config';
import { BaseError } from '../../domain/errors/base-error';
import { ErrorResource } from '../resource/error';

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction): void {
  response
    .status(error instanceof BaseError ? error.statusCode : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json(ErrorResource.from(error, config.app.debug));
}
