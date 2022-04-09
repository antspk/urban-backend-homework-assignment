import { Address } from './address';

export interface LocationProvider {
  getLocation(address: string): Promise<Address | null>;
}

export interface ToggleableLocationProvider extends LocationProvider {
  isEnabled(): boolean;
}
