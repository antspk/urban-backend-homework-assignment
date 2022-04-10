import { expect } from 'chai';

import { Address } from '../../../app/domain/models/address-lookup';
import { ToggleableLocationProvider } from '../../../app/domain/models/location-provider';
import { SequentialProvider } from '../../../app/domain/services/sequential-provider';
import { FAKE_CACHE } from '../../infra/persistence/fake-cache';

describe('domain/services/sequential-provider', () => {
  class FakeProvider implements ToggleableLocationProvider {
    constructor(private delay: number, private enabled: boolean, private address: Address | null) {}

    async getLocation(address: string): Promise<Address | null> {
      return await new Promise<Address | null>((resolve) => {
        setTimeout(() => resolve(this.address), this.delay);
      });
    }

    isEnabled(): boolean {
      return this.enabled;
    }

    isCacheable(): boolean {
      return false;
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
      const provider = new SequentialProvider(
        [new FakeProvider(1, false, null), new FakeProvider(1, true, fakeAddress)],
        FAKE_CACHE,
      );

      const location = await provider.getLocation('searchaddress');

      expect(location).to.eq(fakeAddress);
    });

    it('should return null, when location can not be resolved', async () => {
      const provider = new SequentialProvider(
        [new FakeProvider(1, true, null), new FakeProvider(1, true, null)],
        FAKE_CACHE,
      );

      const location = await provider.getLocation('searchaddress');

      expect(location).to.eq(null);
    });
  });
});
