import { IAddress, LocationProvider } from '../../models/address';

export class SequentialProvider implements LocationProvider {
  constructor(private providers: LocationProvider[]) {}
  
  async getLocation(address: string): Promise<IAddress | null> {
    for await (const provider of this.providers) {
      const location = await provider.getLocation(address);
      if (location) {
        return location;
      }
    }
    
    return null;
  }
}
