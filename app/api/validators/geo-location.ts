import { JSONSchemaType } from 'ajv';
import { Request } from 'express';

import { ajv, validate } from './ajv-validator';

export class GeoLocationQuery {
  readonly address: string;

  constructor(address: string) {
    this.address = address;
  }

  static SCHEMA: JSONSchemaType<GeoLocationQuery> = {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['address'],
    additionalProperties: false,
  };

  static from(req: Request): GeoLocationQuery {
    const query = validate<GeoLocationQuery>(GeoLocationQuery.name, req.query);
    return new GeoLocationQuery(query.address);
  }

  static {
    ajv.addSchema(this.SCHEMA, GeoLocationQuery.name);
  }
}
