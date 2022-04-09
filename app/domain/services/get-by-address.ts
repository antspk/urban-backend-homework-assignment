import { config } from '../../config';
import { GoogleMapsLocationProvider } from '../../infra/clients/googlemaps-provider';
import { OpenCageLocationProvider } from '../../infra/clients/opencage-provider';
import { findServiceArea } from '../../infra/orm/service-areas-provider';
import { AddressNotFoundError } from '../errors/address-not-found-error';
import { AddressNotServicedError } from '../errors/address-not-serviced-error';
import { AddressWithServiceArea } from '../models/address';
import { SequentialProvider } from './sequential-provider';

const locationProvider = new SequentialProvider([
  OpenCageLocationProvider.factory(config),
  GoogleMapsLocationProvider.create(config),
]);

export async function getCoordinatesByAddress(address: string): Promise<AddressWithServiceArea> {
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
