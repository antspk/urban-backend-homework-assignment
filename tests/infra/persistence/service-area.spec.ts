import { expect } from 'chai';
import { GeoJSON } from 'geojson';

import { GeoJsonServiceAreaLookup } from '../../../app/infra/persistence/service-areas-lookup';

describe('lib/services-areas', () => {
  const geoJSON: GeoJSON = {
    type: 'FeatureCollection',
    features: [
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
    ],
  };

  describe('findServiceArea', () => {
    it('should return a services area name, when services area exists', () => {
      const serviceAreaLookup = new GeoJsonServiceAreaLookup(geoJSON);

      const serviceAreaName = serviceAreaLookup.lookup({ lat: 51.547133, lng: -0.005668 });

      expect(serviceAreaName).to.eq('LONDONEAST');
    });

    it(`should return null when, service area doesn't exist`, () => {
      const serviceAreaLookup = new GeoJsonServiceAreaLookup(geoJSON);

      const serviceAreaName = serviceAreaLookup.lookup({ lat: 51.535534, lng: -0.029012 });

      expect(serviceAreaName).to.eq(null);
    });

    it('should return a services area name, when services area exists in geometry collection', () => {
      const serviceAreaLookup = new GeoJsonServiceAreaLookup(geoJSON);

      const serviceAreaName = serviceAreaLookup.lookup({ lat: 50.535534, lng: -0.029012 });

      expect(serviceAreaName).to.eq(null);
    });

    it('should throw an error, when geojson is not a feature collection', () => {
      const serviceAreaLookup = new GeoJsonServiceAreaLookup(geoJSON.features[0]);

      const throwable = (): void => {
        serviceAreaLookup.lookup({ lat: 50.535534, lng: -0.029012 });
      };

      expect(throwable).to.throw();
    });
  });
});
