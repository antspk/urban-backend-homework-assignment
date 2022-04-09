import { AddressType, Client, GeocodeResult, GeocodingAddressComponentType } from '@googlemaps/google-maps-services-js';

import { Address } from '../../domain/models/address-lookup';
import { ConfigurableLocationProvider } from '../../domain/models/location-provider';

export class GoogleMapsLocationProvider implements ConfigurableLocationProvider {
  constructor(private options: GoogleMapsLocationProviderOptions) {}

  async getLocation(address: string): Promise<Address | null> {
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

  private mapAddress(address: GeocodeResult): Address {
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

  getSortOrder(): number {
    return this.options.order;
  }
}

export interface GoogleMapsLocationProviderOptions {
  readonly client: Client;
  readonly enabled: boolean;
  readonly apiKey: string;
  readonly order: number;
}
