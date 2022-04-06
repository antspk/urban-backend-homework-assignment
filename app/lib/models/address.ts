export interface IAddress {
  address1: string;
  address2: string;
  city: string;
  lat: number;
  lng: number;
}

export interface IAddressWithServiceArea extends IAddress {
  serviceArea: string;
}
