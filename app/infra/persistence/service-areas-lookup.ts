import { GeoJSON } from 'geojson';

import { Coordinates, ServiceAreaLookup } from '../../domain/models/service-area-lookup';
import { featureCollectionFromGeoJson, findFeatureByPoint, pointFromCoordinates } from '../turf/turf';

export class GeoJsonServiceAreaLookup implements ServiceAreaLookup {
  constructor(private geoJSON: GeoJSON) {}

  lookup(coordinates: Coordinates): string | null {
    const collection = featureCollectionFromGeoJson(this.geoJSON);
    const point = pointFromCoordinates(coordinates);
    const feature = findFeatureByPoint(point, collection);

    return feature?.properties?.Name ?? null;
  }
}
