import { IAddress, LocationProvider, ToggleableLocationProvider } from '../../models/address';

export class SequentialProvider implements LocationProvider {
  constructor(private providers: ToggleableLocationProvider[]) {}

  async getLocation(address: string): Promise<IAddress | null> {
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
