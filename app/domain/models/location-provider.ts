import { Address } from './address-lookup';

export interface LocationProvider {
  getLocation(address: string): Promise<Address | null>;
}

export interface ToggleableLocationProvider extends LocationProvider {
  isEnabled(): boolean;
}
