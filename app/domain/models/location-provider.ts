import { Address } from './address-lookup';

export interface LocationProvider {
  geocode(address: string): Promise<Address | null>;
}

export interface ToggleableLocationProvider extends LocationProvider {
  isEnabled(): boolean;

  isCacheable(): boolean;
}
