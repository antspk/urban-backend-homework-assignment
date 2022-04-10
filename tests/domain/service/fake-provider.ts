import { Address } from '../../../app/domain/models/address-lookup';
import { ToggleableLocationProvider } from '../../../app/domain/models/location-provider';

export function fakeProvider(enabled: boolean, address: Address | null): ToggleableLocationProvider {
  return {
    geocode: async (_: string): Promise<Address | null> => address,
    isCacheable: () => true,
    isEnabled: () => enabled,
  };
}
