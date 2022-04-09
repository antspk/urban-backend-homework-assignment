import { expect } from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';
import { app } from '../../app';
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
  };
  
  afterEach(async () => sinon.restore());
  
  describe('/geolocation (GET)', () => {
    it('should return service area location, when address is within service area', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').resolves(fakeAddress);
      
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
    
    it('should return address not found error, when add is not found', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').resolves(null);

      const response = await request(app).get('/geolocation?address=testingaddress');

      expect(response).to.deep.include({
        status: 404,
        body: {
          message: 'Address testingaddress not found',
          status: 'ADDRESS_NOT_FOUND'
        }
      });
    });

    it('should return address not serviced error, when address is outside service area', async () => {
      sinon.stub(OpenCageLocationProvider.prototype, 'getLocation').resolves(fakeAddress);
      sinon.stub(ServiceAreas, 'findServiceArea').returns(null);

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
