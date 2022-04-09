import { AddressNotFoundError } from '../errors/address-not-found-error';
import { AddressNotServicedError } from '../errors/address-not-serviced-error';
import { IAddressWithServiceArea } from '../models/address';
import { findServiceArea } from '../service-areas';
import { OpenCageLocationProvider } from './providers/opencage-provider'

const openCageLocationProvider = new OpenCageLocationProvider();

export async function getCoordinatesByAddress(
  address: string,
): Promise<IAddressWithServiceArea> {
  const response = await openCageLocationProvider.getLocation(address);

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
