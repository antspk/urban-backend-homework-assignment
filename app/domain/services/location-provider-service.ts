import { Address } from '../models/address-lookup';
import { Cache } from '../models/cache';
import { LocationProvider, ToggleableLocationProvider } from '../models/location-provider';

export class LocationProviderService implements LocationProvider {
  constructor(private providers: ToggleableLocationProvider[], private cache: Cache) {}

  async geocode(address: string): Promise<Address | null> {
    for await (const provider of this.providers) {
      if (provider.isEnabled()) {
        const location = provider.isCacheable()
          ? await this.cache.wrap(address, () => provider.geocode(address))
          : await provider.geocode(address);

        if (location) {
          return location;
        }
      }
    }

    return null;
  }
}
