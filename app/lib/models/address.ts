export interface IAddress {
  address1: string;
  address2: string;
  city: string;
  lat: number;
  lng: number;
  postcode: string;
}

export interface IAddressWithServiceArea extends IAddress {
  serviceArea: string;
}

export interface LocationProvider {
  getLocation(address: string): Promise<IAddress | null>
}

export interface ToggleableLocationProvider extends LocationProvider {
  isEnabled(): boolean;
}