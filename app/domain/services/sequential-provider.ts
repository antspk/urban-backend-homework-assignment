import { Address } from '../models/address-lookup';
import { ConfigurableLocationProvider, LocationProvider } from '../models/location-provider';

export class SequentialProvider implements LocationProvider {
  constructor(private providers: ConfigurableLocationProvider[]) {}

  async getLocation(address: string): Promise<Address | null> {
    const providers = this.providers.sort((a, b) => a.getSortOrder() - b.getSortOrder());

    console.log(providers);

    for await (const provider of providers) {
      if (provider.isEnabled()) {
        const location = await provider.getLocation(address);
        if (location) {
          return location;
        }
      }
    }

    return null;
  }
}
