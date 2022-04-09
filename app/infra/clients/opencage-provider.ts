import { Geocoder } from 'geocoder-opencagedata';

import { Address } from '../../domain/models/address-lookup';
import { ConfigurableLocationProvider } from '../../domain/models/location-provider';

export class OpenCageLocationProvider implements ConfigurableLocationProvider {
  constructor(private options: OpenCageLocationProviderOptions) {}

  async getLocation(address: string): Promise<Address | null> {
    const response = await this.options.client.geocode({ q: address });

    if (!response.ok || !response.results || response.results.length === 0) {
      return null;
    }

    return {
      address1: response.results[0].formatted,
      address2: response.results[0].components.state_district,
      city: response.results[0].components.city,
      lat: response.results[0].geometry.lat as number,
      lng: response.results[0].geometry.lng as number,
      postcode: response.results[0].components.postcode,
    };
  }

  isEnabled(): boolean {
    return this.options.enabled;
  }

  getSortOrder(): number {
    return this.options.order;
  }
}

export interface OpenCageLocationProviderOptions {
  client: Geocoder;
  enabled: boolean;
  order: number;
}
