import { expect } from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';
import { app } from '../../app';
import * as GoogleMapsProvider from '../../app/lib/coordinates/providers/googlemaps-provider';
import { IAddress } from '../../app/lib/models/address';
import * as ServiceAreas from '../../app/lib/service-areas';

describe('controllers/geo-location', () => {
  const sandbox = sinon.createSandbox();
  
  const fakeAddress: IAddress = {
    lat: 51.547133,
    lng: -0.005668,
    address1: 'testing address1',
    address2: 'testing address2',
    city: 'LONDON',
  };
  
  afterEach(async () => {
    sandbox.restore();
  });
  
  describe('/geolocation (GET)', () => {
    it('should return service area location, when address is within service area', async () => {
      sandbox.stub(GoogleMapsProvider, 'geocode').resolves(fakeAddress);

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
            serviceArea: 'LONEAST' 
          },
          search: 'testingaddress',
          status: 'OK',
        }
      });
    });
    
    it('should return ADDRESS_NOT_FOUND error, when add is not found', async () => {
      sandbox.stub(GoogleMapsProvider, 'geocode').resolves(null);

      const response = await request(app).get('/geolocation?address=testingaddress');
      
      expect(response).to.deep.include({
        status: 404,
        body: {
          message: 'Address testingaddress not found',
          status: 'ADDRESS_NOT_FOUND'
        }
      });
    });
    
    it('should return ADDRESS_NOT_SERVICED error, when address is outside service area', async () => {
      sandbox.stub(GoogleMapsProvider, 'geocode').resolves(fakeAddress);
      sandbox.stub(ServiceAreas, 'findServiceArea').returns(null);

      const response = await request(app).get('/geolocation?address=testingaddress');

      expect(response).to.deep.include({
        status: 400,
        body: {
          message: 'Address testingaddress is outside service area',
          status: 'ADDRESS_NOT_SERVICED',
        }
      });
    });
  });
});
