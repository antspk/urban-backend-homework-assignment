import { expect } from 'chai';
import { geocoder } from 'geocoder-opencagedata';
import { restore, stub } from 'sinon';

import { OpenCageLocationProvider } from '../../../app/infra/clients/opencage-provider';

describe('infra/clients/opencage-provider', () => {
  const client = new geocoder({});
  const provider = new OpenCageLocationProvider({ client, enabled: true, cache: true });

  const response = {
    ok: true,
    results: [
      {
        geometry: { lat: 51.547133, lng: -0.005668 },
        formatted: 'testing address1',
        components: {
          city: 'LONDON',
          postcode: 'EXAMPLE',
          state_district: 'testing address2',
        },
      },
    ],
  };

  afterEach(() => restore());

  describe('getLocation', () => {
    it('should return resolved address location, when request is successful', async () => {
      stub(client, 'geocode').resolves(response as Awaited<ReturnType<geocoder['geocode']>>);

      const result = await provider.geocode('search address');

      expect(result).to.deep.eq({
        address1: 'testing address1',
        address2: 'testing address2',
        city: 'LONDON',
        lat: 51.547133,
        lng: -0.005668,
        postcode: 'EXAMPLE',
      });
    });

    it('should return null, when request is not successful', async () => {
      stub(client, 'geocode').resolves({} as Awaited<ReturnType<geocoder['geocode']>>);

      const result = await provider.geocode('search adress');

      expect(result).to.eq(null);
    });

    it('should return resolved with missing data, when request is successful, but lacks information', async () => {
      const noComponentsResponse = { ok: true, results: [{ ...response.results[0], components: [] }] };
      stub(client, 'geocode').resolves(noComponentsResponse as Awaited<ReturnType<geocoder['geocode']>>);

      const result = await provider.geocode('search address');

      expect(result).to.deep.eq({
        address1: 'testing address1',
        address2: undefined,
        city: undefined,
        lat: 51.547133,
        lng: -0.005668,
        postcode: undefined,
      });
    });
  });
});
