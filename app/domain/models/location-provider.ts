import { Address } from './address-lookup';

export interface LocationProvider {
  getLocation(address: string): Promise<Address | null>;
}

export interface ConfigurableLocationProvider extends LocationProvider {
  isEnabled(): boolean;

  getSortOrder(): number;
}
