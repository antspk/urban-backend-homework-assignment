import { expect } from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';
import { app } from '../../app';
import * as GoogleMapsProvider from '../../app/lib/coordinates/providers/googlemaps-provider';
import * as ServiceAreas from '../../app/lib/service-areas';

describe('geo-location', () => {
  const sandbox = sinon.createSandbox();
  
  beforeEach(() => {
    sandbox.restore();
  });
  
  it('should return a valid service area', async () => {
    sandbox.stub(GoogleMapsProvider, 'geocode').resolves({
      lat: 51.547133,
      lng: -0.005668,
      address1: 'testing address1',
      address2: 'testing address2',
      city: 'LONDON',
    });
    
    const { status, body } = await request(app)
      .get('/geolocation?address=testingaddress')
      .send();

    expect(status).to.eq(200);
    expect(body).to.deep.eq({
      search: 'testingaddress',
      status: 'OK',
      location: {
        address1: 'testing address1',
        address2: 'testing address2',
        city: 'LONDON',
        lat: 51.547133,
        lng: -0.005668,
        serviceArea: 'LONEAST',
      },
    });
  });

  it('should throw an error, when address is not found', async () => {
    sandbox.stub(GoogleMapsProvider, 'geocode').resolves(null);

    const { status, body } = await request(app)
      .get('/geolocation?address=testingaddress')
      .send();

    expect(status).to.eq(404);
    expect(body).to.deep.eq({
      message: 'Address testingaddress not found',
      status: 'ADDRESS_NOT_FOUND'
    });
  });

  it('should throw an error, when address is outside service area', async () => {
    sandbox.stub(GoogleMapsProvider, 'geocode').resolves({
      lat: 51.547133,
      lng: -0.005668,
      address1: 'testing address1',
      address2: 'testing address2',
      city: 'LONDON',
    });
    
    sandbox.stub(ServiceAreas, 'findServiceArea').returns(null);

    const { status, body } = await request(app)
      .get('/geolocation?address=testingaddress')
      .send();

    expect(status).to.eq(400);
    expect(body).to.deep.eq({
      message: 'Address testingaddress is outside service area',
      status: 'ADDRESS_NOT_SERVICED',
    });
  });
});
