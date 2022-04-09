import { Address } from '../models/address';
import { LocationProvider, ToggleableLocationProvider } from '../models/location-provider';

export class SequentialProvider implements LocationProvider {
  constructor(private providers: ToggleableLocationProvider[]) {}

  async getLocation(address: string): Promise<Address | null> {
    for await (const provider of this.providers) {
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
