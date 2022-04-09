import { AddressType, Client, GeocodeResult, GeocodingAddressComponentType } from '@googlemaps/google-maps-services-js';

import { Config } from '../../../config';
import { IAddress, ToggleableLocationProvider } from '../../models/address';

export class GoogleMapsLocationProvider implements ToggleableLocationProvider {
  constructor(private options: { client: Client; enabled: boolean; apiKey: string }) {}

  async getLocation(address: string): Promise<IAddress | null> {
    const googleAddress = await this.options.client.geocode({
      params: {
        address,
        key: this.options.apiKey,
      },
    });

    if (!googleAddress.data?.results?.length) {
      return null;
    }

    return this.mapAddress(googleAddress.data.results[0]);
  }

  private mapAddress(address: GeocodeResult): IAddress {
    const { address_components: components, geometry } = address;

    return {
      address1: components.find((x) => x.types.includes(AddressType.route))?.long_name,
      address2: components.find((x) => x.types.includes(AddressType.neighborhood))?.long_name,
      city: components.find((x) => x.types.includes(GeocodingAddressComponentType.postal_town))?.long_name,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      postcode: components.find((x) => x.types.includes(AddressType.postal_code))?.long_name,
    };
  }

  isEnabled(): boolean {
    return this.options.enabled;
  }

  static create(config: Config): GoogleMapsLocationProvider {
    return new GoogleMapsLocationProvider({
      apiKey: config.googleMapsProvider.apiKey,
      enabled: config.openCageProvider.enabled,
      client: new Client({}),
    });
  }
}
