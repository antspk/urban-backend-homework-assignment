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
