import { expect } from 'chai';
import { SequentialProvider } from '../../app/lib/coordinates/providers/sequential-provider';
import { IAddress, ToggleableLocationProvider } from '../../app/lib/models/address';

describe('lib/coordinates/providers/sequential-provider', () => {
  class FakeProvider implements ToggleableLocationProvider {
    constructor(private delay: number, private enabled: boolean, private address: IAddress | null) {
    }

    async getLocation(address: string): Promise<IAddress | null> {
      return new Promise<IAddress | null>((resolve) => {
        setTimeout(() => resolve(this.address), this.delay);
      });
    }

    isEnabled(): boolean {
      return this.enabled;
    }
  }
  
  const fakeAddress: IAddress = {
    lat: 51.547133,
    lng: -0.005668,
    address1: 'testing address1',
    address2: 'testing address2',
    city: 'LONDON',
  };
  
  describe('SequentialProvider', () => {
    it('should return first location that is resolved', async () => {
      const provider = new SequentialProvider([
        new FakeProvider(1, false, null), 
        new FakeProvider(1, true, fakeAddress)
      ]);
      
      const location = await provider.getLocation('searchaddress');
      
      expect(location).to.eq(fakeAddress);
    });

    it('should return null, when location can not be resolved', async () => {
      const provider = new SequentialProvider([
        new FakeProvider(1, true, null), 
        new FakeProvider(1, true, null)
      ]);

      const location = await provider.getLocation('searchaddress');

      expect(location).to.eq(null);
    });
  });
});
