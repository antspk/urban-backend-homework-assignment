import { expect } from 'chai';

import { Address } from '../../../app/domain/models/address-lookup';
import { ConfigurableLocationProvider } from '../../../app/domain/models/location-provider';
import { SequentialProvider } from '../../../app/domain/services/sequential-provider';

describe('domain/services/sequential-provider', () => {
  class FakeProvider implements ConfigurableLocationProvider {
    constructor(
      private delay: number,
      private enabled: boolean,
      private address: Address | null,
      private order: number,
    ) {}

    async getLocation(address: string): Promise<Address | null> {
      return await new Promise<Address | null>((resolve) => {
        setTimeout(() => resolve(this.address), this.delay);
      });
    }

    isEnabled(): boolean {
      return this.enabled;
    }

    getSortOrder(): number {
      return this.order;
    }
  }

  const fakeAddress: Address = {
    lat: 51.547133,
    lng: -0.005668,
    address1: 'testing address1',
    address2: 'testing address2',
    city: 'LONDON',
    postcode: 'EXAMPLE',
  };

  describe('SequentialProvider', () => {
    it('should return first location that is resolved', async () => {
      const provider = new SequentialProvider([
        new FakeProvider(1, false, null, 1),
        new FakeProvider(1, true, fakeAddress, 2),
      ]);

      const location = await provider.getLocation('searchaddress');

      expect(location).to.eq(fakeAddress);
    });

    it('should return null, when location can not be resolved', async () => {
      const provider = new SequentialProvider([new FakeProvider(1, true, null, 1), new FakeProvider(1, true, null, 2)]);

      const location = await provider.getLocation('searchaddress');

      expect(location).to.eq(null);
    });
  });
});
