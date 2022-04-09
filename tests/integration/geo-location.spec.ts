import { expect } from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';

import { app } from '../../app/app';
import { GoogleMapsLocationProvider } from '../../app/lib/coordinates/providers/googlemaps-provider';
import { OpenCageLocationProvider } from '../../app/lib/coordinates/providers/opencage-provider';
import { IAddress } from '../../app/lib/models/address';
import * as ServiceAreas from '../../app/lib/service-areas';

describe('controllers/geo-location', () => {
  const fakeAddress: IAddress = {
    lat: 51.547133,
    lng: -0.005668,
    address1: 'testing address1',
    address2: 'testing address2',
    city: 'LONDON',
    postcode: 'EXAMPLE',
  };

  afterEach(async () => sinon.restore());

  describe('/geolocation (GET)', () => {
    it('should return service area location, when address is within service area', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').resolves(fakeAddress);
      sinon.stub(GoogleMapsLocationProvider.prototype, 'getLocation').resolves(null);

      const response = await request(app).get('/geolocation?address=testingaddress');

      expect(response).to.deep.include({
        status: 200,
        body: {
          location: {
            lat: 51.547133,
            lng: -0.005668,
            address1: 'testing address1',
            address2: 'testing address2',
            city: 'LONDON',
            postcode: 'EXAMPLE',
            serviceArea: 'LONEAST',
          },
          search: 'testingaddress',
          status: 'OK',
        },
      });
    });

    it('should return address not found error, when adress is not found', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').resolves(null);
      sinon.stub(GoogleMapsLocationProvider.prototype, 'getLocation').resolves(null);

      const response = await request(app).get('/geolocation?address=testingaddress');

      expect(response).to.deep.include({
        status: 404,
        body: {
          message: 'Address testingaddress not found',
          status: 'ADDRESS_NOT_FOUND',
        },
      });
    });

    it('should return address not serviced error, when address is outside service area', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').resolves(fakeAddress);
      sinon.stub(GoogleMapsLocationProvider.prototype, 'getLocation').resolves(null);
      sinon.stub(ServiceAreas, 'findServiceArea').returns(null);

      const response = await request(app).get('/geolocation?address=testingaddress');

      expect(response).to.deep.include({
        status: 400,
        body: {
          message: 'Address testingaddress is outside service area',
          status: 'ADDRESS_NOT_SERVICED',
        },
      });
    });

    it('should return internal server error, when unhandled error occurs', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').rejects(new Error());

      const response = await request(app).get('/geolocation?address=testingaddress');

      expect(response).to.deep.include({
        status: 500,
        body: {
          message: 'An unexpected error occurred',
          status: 'INTERNAL_SERVER_ERROR',
        },
      });
    });
  });
});
