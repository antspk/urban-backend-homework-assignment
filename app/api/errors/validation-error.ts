import { ErrorObject } from 'ajv';
import { constants } from 'http2';

import { BaseError } from '../../domain/errors/base-error';

export class ValidationError extends BaseError {
  code = 'VALIDATION_ERROR';

  statusCode = constants.HTTP_STATUS_BAD_REQUEST;

  errors: ErrorObject[];

  constructor(errors: ErrorObject[]) {
    super('Bad Request');
    this.errors = errors;
  }
}
