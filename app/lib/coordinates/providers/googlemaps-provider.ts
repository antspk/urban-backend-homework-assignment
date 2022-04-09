import {
  AddressType,
  Client,
  GeocodeResult,
  GeocodingAddressComponentType
} from '@googlemaps/google-maps-services-js';
import { IAddress, ToggleableLocationProvider } from '../../models/address';

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;

export class GoogleMapsLocationProvider implements ToggleableLocationProvider {
  private googlemapsClient = new Client({});
  
  async getLocation(address: string): Promise<IAddress> {
    const googleAddress = await this.googlemapsClient.geocode({
      params: {
        address,
        key: GOOGLE_MAPS_KEY,
      },
    });

    if (
      (!googleAddress.data && !googleAddress?.data?.results) ||
      googleAddress?.data?.results?.length === 0
    ) {
      return null;
    }

    const [result] = googleAddress.data.results;
    return this.mapAddress(result);
  }
  
  private mapAddress(googleAddress: GeocodeResult): IAddress {
    const { address_components, geometry } = googleAddress
    
    return {
      address1: address_components.find((x) => x.types.includes(AddressType.route))?.long_name,
      address2: address_components.find((x) => x.types.includes(AddressType.neighborhood))?.long_name,
      city: address_components.find((x) => x.types.includes(GeocodingAddressComponentType.postal_town))?.long_name,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      postcode: address_components.find((x) => x.types.includes(AddressType.postal_code))?.long_name,
    };
  }

  isEnabled(): boolean {
    return process.env.GOOGLE_MAPS_ENABLED === 'true';
  }
}