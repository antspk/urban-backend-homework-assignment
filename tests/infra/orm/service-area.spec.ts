import { expect } from 'chai';
import { GeoJSON } from 'geojson';
import * as sinon from 'sinon';

import * as orm from '../../../app/infra/orm/service-areas';
import { findServiceArea } from '../../../app/infra/orm/service-areas-provider';

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
  {
    type: 'Feature',
    properties: {
      Name: 'LONDONCENTRAL',
    },
    geometry: {
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Polygon',
          coordinates: [
            [
              [-0.10884404182434082, 50.50659222851966],
              [-0.10638713836669922, 50.50659222851966],
              [-0.10638713836669922, 50.507273368348315],
              [-0.10884404182434082, 50.507273368348315],
              [-0.10884404182434082, 50.50659222851966],
            ],
          ],
        },
      ],
    },
  },
];

describe('lib/services-areas', () => {
  afterEach(() => sinon.restore());

  describe('findServiceArea', () => {
    it('should return a services area name, when services area exists', () => {
      sinon.stub(orm, 'getGeoJson').returns({ features: geojson } as GeoJSON);

      const serviceAreaName = findServiceArea(51.547133, -0.005668);

      expect(serviceAreaName).to.eq('LONDONEAST');
    });

    it(`should return null when, service area doesn't exist`, () => {
      sinon.stub(orm, 'getGeoJson').returns({ features: geojson } as GeoJSON);

      const serviceAreaName = findServiceArea(51.535534, -0.029012);

      expect(serviceAreaName).to.eq(null);
    });

    it('should return a services area name, when services area exists in geometry collection', () => {
      sinon.stub(orm, 'getGeoJson').returns({ features: geojson } as GeoJSON);

      const serviceAreaName = findServiceArea(50.535534, -0.029012);

      expect(serviceAreaName).to.eq(null);
    });
  });
});
