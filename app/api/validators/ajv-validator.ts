import { default as Ajv } from 'ajv';

import { ValidationError } from '../errors/validation-error';

export const ajv = new Ajv();

export function validate<T>(name: string, bag: unknown): T | never {
  const schemaValidate = ajv.getSchema(name);

  if (!schemaValidate) {
    throw new Error(`${name} schema not found`);
  }

  const isValid = schemaValidate(bag);

  if (!isValid && schemaValidate.errors) {
    throw new ValidationError(schemaValidate.errors);
  }

  return bag as T;
}
