import { JSONSchemaType } from 'ajv';

import { AddressWithServiceArea } from '../../domain/models/address-lookup';

export class LocationResource {
  readonly address1?: string;

  readonly address2?: string;

  readonly city?: string;

  readonly lat: number;

  readonly lng: number;

  readonly postcode?: string;

  readonly serviceArea: string;

  constructor(
    address1: string | undefined,
    address2: string | undefined,
    city: string | undefined,
    lat: number,
    lng: number,
    postcode: string | undefined,
    serviceArea: string,
  ) {
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.lat = lat;
    this.lng = lng;
    this.postcode = postcode;
    this.serviceArea = serviceArea;
  }

  static from(location: AddressWithServiceArea): LocationResource {
    return new LocationResource(
      location.address1,
      location.address2,
      location.city,
      location.lat,
      location.lng,
      location.postcode,
      location.serviceArea,
    );
  }

  static SCHEMA: JSONSchemaType<Required<LocationResource>> = {
    type: 'object',
    properties: {
      address1: {
        type: 'string',
      },
      address2: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
      lat: {
        type: 'number',
      },
      lng: {
        type: 'number',
      },
      postcode: {
        type: 'string',
      },
      serviceArea: {
        type: 'string',
      },
    },
    required: ['lng', 'lat', 'serviceArea'],
    additionalProperties: false,
  };
}
