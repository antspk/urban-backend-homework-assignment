import { AddressNotFoundError } from '../errors/address-not-found-error';
import { AddressNotServicedError } from '../errors/address-not-serviced-error';
import { IAddressWithServiceArea } from '../models/address';
import { findServiceArea } from '../service-areas';
import { OpenCageLocationProvider } from './providers/opencage-provider'
import { GoogleMapsLocationProvider } from './providers/googlemaps-provider'
import { SequentialProvider } from './providers/sequential-provider';

const locationProvider = new SequentialProvider([
  new OpenCageLocationProvider(),
  new GoogleMapsLocationProvider(),
]);

export async function getCoordinatesByAddress(
  address: string,
): Promise<IAddressWithServiceArea> {
  const response = await locationProvider.getLocation(address);

  if (!response) {
    throw new AddressNotFoundError(address);
  }

  const serviceArea = findServiceArea(response.lat, response.lng);
  
  if (!serviceArea) {
    throw new AddressNotServicedError(address);
  }

  return {
    ...response,
    serviceArea,
  };
}
