import { AddressWithServiceArea } from '../../domain/models/address-lookup';
import { GeoLocationQuery } from '../validators/geo-location';

export class GeoLocationResource {
  readonly status = 'OK';

  readonly search: string;

  readonly location: AddressWithServiceArea;

  constructor(search: string, location: AddressWithServiceArea) {
    this.search = search;
    this.location = location;
  }

  static from(search: GeoLocationQuery, location: AddressWithServiceArea): GeoLocationResource {
    return new GeoLocationResource(search.address, location);
  }
}
