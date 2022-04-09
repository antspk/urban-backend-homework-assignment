export interface AddressLookup {
  lookup(address: string): Promise<AddressWithServiceArea>;
}

export interface LookupParams {
  readonly address: string;
}

export interface Address {
  address1?: string;
  address2?: string;
  city?: string;
  lat: number;
  lng: number;
  postcode?: string;
}

export interface AddressWithServiceArea extends Address {
  serviceArea: string;
}
