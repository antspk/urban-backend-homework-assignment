import { Client } from '@googlemaps/google-maps-services-js';
import { GeocodeResponse } from '@googlemaps/google-maps-services-js/dist/geocode/geocode';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { GoogleMapsLocationProvider } from '../../../app/infra/clients/googlemaps-provider';

describe('infra/clients/googlemaps-provider', () => {
  const client = new Client({});
  const provider = new GoogleMapsLocationProvider({ client, enabled: true, apiKey: '' });
  const response = {
    data: {
      results: [
        {
          geometry: { location: { lat: 51.547133, lng: -0.005668 } },
          address_components: [
            { long_name: 'testing address1', short_name: 'testing address1', types: ['route'] },
            { long_name: 'testing address2', short_name: 'testing address2', types: ['neighborhood'] },
            { long_name: 'LONDON', short_name: 'LONDON', types: ['postal_town'] },
            { long_name: 'EXAMPLE', short_name: 'EXAMPLE', types: ['postal_code'] },
          ],
        },
      ],
    },
  };

  afterEach(() => sinon.restore());

  describe('getLocation', () => {
    it('should return resolved address location, when request is successful', async () => {
      sinon.stub(client, 'geocode').resolves(response as unknown as GeocodeResponse);

      const result = await provider.getLocation('search address');

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
      sinon.stub(client, 'geocode').resolves({} as unknown as GeocodeResponse);

      const result = await provider.getLocation('search adress');

      expect(result).to.eq(null);
    });

    it('should return resolved with missing data, when request is successful, but lacks information', async () => {
      const noComponentsResponse = { data: { results: [{ ...response.data.results[0], address_components: [] }] } };
      sinon.stub(client, 'geocode').resolves(noComponentsResponse as unknown as GeocodeResponse);

      const result = await provider.getLocation('search address');

      expect(result).to.deep.eq({
        address1: undefined,
        address2: undefined,
        city: undefined,
        lat: 51.547133,
        lng: -0.005668,
        postcode: undefined,
      });
    });
  });
});
