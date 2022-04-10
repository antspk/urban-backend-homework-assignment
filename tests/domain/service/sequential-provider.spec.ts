import { expect } from 'chai';

import { Address } from '../../../app/domain/models/address-lookup';
import { LocationProviderService } from '../../../app/domain/services/location-provider-service';
import { FAKE_CACHE } from '../../infra/persistence/fake-cache';
import { fakeProvider } from './fake-provider';

describe('domain/services/sequential-provider', () => {
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
      const provider = new LocationProviderService(
        [fakeProvider(false, null), fakeProvider(true, fakeAddress)],
        FAKE_CACHE,
      );

      const location = await provider.geocode('searchaddress');

      expect(location).to.eq(fakeAddress);
    });

    it('should return null, when location can not be resolved', async () => {
      const provider = new LocationProviderService([fakeProvider(true, null), fakeProvider(true, null)], FAKE_CACHE);

      const location = await provider.geocode('searchaddress');

      expect(location).to.eq(null);
    });
  });
});
