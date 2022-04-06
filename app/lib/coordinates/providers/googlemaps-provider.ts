import {
  AddressType,
  Client,
  GeocodeResult,
  GeocodingAddressComponentType
} from '@googlemaps/google-maps-services-js';
import { IAddress } from '../../models/address';

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;

const googlemapsClient = new Client({});

export async function geocode(address: string): Promise<IAddress> {
  const googleAddress = await googlemapsClient.geocode({
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
  return mapAddress(result);
}

function mapAddress(googleAddress: GeocodeResult) {
  return {
    address1: googleAddress.address_components.find((x) =>
      x.types.includes(AddressType.route),
    )?.long_name,
    address2: googleAddress.address_components.find((x) =>
      x.types.includes(AddressType.neighborhood),
    )?.long_name,
    city: googleAddress.address_components.find((x) =>
      x.types.includes(GeocodingAddressComponentType.postal_town),
    )?.long_name,
    lat: googleAddress.geometry.location.lat,
    lng: googleAddress.geometry.location.lng,
  };
}
