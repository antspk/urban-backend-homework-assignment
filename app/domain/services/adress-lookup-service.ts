import { AddressNotFoundError } from '../errors/address-not-found-error';
import { AddressNotServicedError } from '../errors/address-not-serviced-error';
import { AddressLookup, AddressWithServiceArea } from '../models/address-lookup';
import { LocationProvider } from '../models/location-provider';
import { ServiceAreaLookup } from '../models/service-area-lookup';

export class AddressLookupService implements AddressLookup {
  constructor(private locationProvider: LocationProvider, private serviceAreaLookup: ServiceAreaLookup) {}

  async lookup(address: string): Promise<AddressWithServiceArea> {
    const location = await this.locationProvider.getLocation(address);

    if (!location) {
      throw new AddressNotFoundError(address);
    }

    const serviceArea = this.serviceAreaLookup.lookup(location);

    if (!serviceArea) {
      throw new AddressNotServicedError(address);
    }

    return { ...location, serviceArea };
  }
}
