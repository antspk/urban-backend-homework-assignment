import { JSONSchemaType } from 'ajv';

import { AddressWithServiceArea } from '../../domain/models/address-lookup';
import { GeoLocationQuery } from '../validators/geo-location';
import { LocationResource } from './location';

export class GeoLocationResource {
  readonly status: string;

  readonly search: string;

  readonly location: Required<LocationResource>;

  constructor(search: string, location: Required<LocationResource>) {
    this.status = 'UP';
    this.search = search;
    this.location = location;
  }

  static SCHEMA: JSONSchemaType<GeoLocationResource> = {
    type: 'object',
    properties: {
      status: { type: 'string', default: 'UP' },
      search: { type: 'string' },
      location: LocationResource.SCHEMA,
    },
    required: ['status', 'search', 'location'],
    additionalProperties: false,
  };

  static from(search: GeoLocationQuery, location: AddressWithServiceArea): GeoLocationResource {
    return new GeoLocationResource(search.address, LocationResource.from(location) as Required<LocationResource>);
  }
}
