import { ErrorObject, JSONSchemaType } from 'ajv';

import { BaseError } from '../../domain/errors/base-error';
import { ValidationError } from '../errors/validation-error';

const SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';
const SERVER_ERROR_MESSAGE = 'An unexpected error occurred';

export class ErrorResource {
  readonly status: string;

  readonly message: string;

  constructor(status: string, message: string, errors?: ErrorObject[], stack?: string[]) {
    this.status = status;
    this.message = message;

    (this as { errors?: ErrorObject[] }).errors = errors;
    (this as { stack?: string[] }).stack = stack;
  }

  static from(error: Error, debug: boolean): ErrorResource {
    const status = error instanceof BaseError ? error.code : SERVER_ERROR_CODE;
    const message = status !== SERVER_ERROR_CODE ? error.message : SERVER_ERROR_MESSAGE;

    const errors = error instanceof ValidationError ? error.errors : undefined;

    let stack = undefined;

    if (debug) {
      if (error.stack) {
        stack = error.stack.split('\n');
      }
    }

    return new ErrorResource(status, message, errors, stack);
  }

  static SCHEMA: JSONSchemaType<Required<ErrorResource>> = {
    description: 'Unsuccessful response',
    type: 'object',
    properties: {
      status: { type: 'string' },
      message: { type: 'string' },
    },
    required: ['status', 'message'],
    additionalProperties: false,
  };
}
