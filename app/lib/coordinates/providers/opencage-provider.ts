import { IAddress, ToggleableLocationProvider } from '../../models/address';
import { geocoder, IGeoPoint } from 'geocoder-opencagedata';

const OPEN_CAGE_KEY = process.env.OPEN_CAGE_KEY;

export class OpenCageLocationProvider implements ToggleableLocationProvider {
  
  private openCageClient = new geocoder({ api_key: OPEN_CAGE_KEY });
  
  async getLocation(address: string): Promise<IAddress> {
    const information = await this.openCageClient.geocode({ q: address });

    if (!information.ok || information.results.length === 0) {
      return null;
    }

    return {
      address1: information.results[0].formatted,
      address2: information.results[0].components.state_district,
      city: information.results[0].components.city,
      lat: information.results[0].geometry.lat as number,
      lng: information.results[0].geometry.lng as number
    };
  }

  isEnabled(): boolean {
    return process.env.OPEN_CAGE_ENABLED === 'true';
  }
}

interface OpenCageResult {
  annotations?: any;
  bounds: {
    northeast: IGeoPoint;
    southwest: IGeoPoint;
  };
  components?: any;
  confidence: number;
  formatted: string;
  geometry: IGeoPoint;
}
