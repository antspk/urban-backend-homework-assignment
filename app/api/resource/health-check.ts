import { JSONSchemaType } from 'ajv';

export class HealthCheckResource {
  readonly status = 'UP';

  static from(): HealthCheckResource {
    return new HealthCheckResource();
  }

  static SCHEMA: JSONSchemaType<HealthCheckResource> = {
    type: 'object',
    properties: {
      status: { type: 'string', default: 'UP' },
    },
    required: ['status'],
    additionalProperties: false,
  };
}
