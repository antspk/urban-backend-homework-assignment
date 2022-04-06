import { expect } from 'chai';
import { GeoJSON } from 'geojson';
import * as sinon from 'sinon';
import { findServiceArea } from '../../app/lib/service-areas';
import * as orm from '../../app/orm/service-areas';

const geojson: GeoJSON[] = [
  {
    type: 'Feature',
    properties: {
      Name: 'LONDONEAST',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-0.00723123550415039, 51.5459347222684],
          [-0.0034761428833007812, 51.5459347222684],
          [-0.0034761428833007812, 51.54765609764073],
          [-0.00723123550415039, 51.54765609764073],
          [-0.00723123550415039, 51.5459347222684],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: {
      Name: 'LONDONCENTRAL',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-0.10884404182434082, 51.50659222851966],
          [-0.10638713836669922, 51.50659222851966],
          [-0.10638713836669922, 51.507273368348315],
          [-0.10884404182434082, 51.507273368348315],
          [-0.10884404182434082, 51.50659222851966],
        ],
      ],
    },
  },
];

describe('lib/service-areas', () => {
  beforeEach(() => {
    sinon.stub(orm, 'getGeoJson').returns({
      features: geojson,
    } as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a service area name if one exists', async () => {
    const serviceAreaName = await findServiceArea(51.547133, -0.005668);
    expect(serviceAreaName).to.eq('LONDONEAST');
  });

  it('should return null when there is no service area', async () => {
    const serviceAreaName = await findServiceArea(51.535534, -0.029012);
    expect(serviceAreaName).to.be.null;
  });
});
