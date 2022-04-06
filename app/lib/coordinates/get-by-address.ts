import { AddressNotFoundError } from '../errors/address-not-found-error';
import { IAddressWithServiceArea } from '../models/address';
import { findServiceArea } from '../service-areas';
import { geocode } from './providers/googlemaps-provider';

export async function getCoordinatesByAddress(
  address: string,
): Promise<IAddressWithServiceArea> {
  const response = await geocode(address);

  if (!response) {
    throw new AddressNotFoundError(address);
  }

  const serviceArea = findServiceArea(response.lat, response.lng);
  return {
    ...response,
    serviceArea,
  };
}
