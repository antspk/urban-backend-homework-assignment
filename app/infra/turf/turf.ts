import {
  booleanWithin,
  Feature,
  FeatureCollection,
  featureCollection,
  Geometry,
  GeometryCollection,
  Point,
  point,
} from '@turf/turf';
import { GeoJSON } from 'geojson';

import { Coordinates } from '../../domain/models/service-area-lookup';

export function isCollection(geometry: Geometry | GeometryCollection): geometry is GeometryCollection {
  return (geometry as GeometryCollection).geometries !== undefined;
}

export function isInGeometry(fp: Feature<Point>, geometry: Geometry | GeometryCollection): boolean {
  if (isCollection(geometry)) {
    return geometry.geometries.find((item) => booleanWithin(fp, item)) !== undefined;
  }

  return booleanWithin(fp, geometry);
}

export function findFeatureByPoint(fp: Feature<Point>, collection: FeatureCollection): Feature | undefined {
  return collection.features.find((feature) => isInGeometry(fp, feature.geometry));
}

export function pointFromCoordinates(coordinates: Coordinates): Feature<Point> {
  return point([coordinates.lng, coordinates.lat]);
}

function isFeatureCollection(json: unknown): json is FeatureCollection {
  return !!(json as FeatureCollection).features;
}

export function featureCollectionFromGeoJson(json: GeoJSON): FeatureCollection {
  if (!isFeatureCollection(json)) {
    throw new Error('Provided GeoJSON is not a feature collection');
  }

  return featureCollection(json.features);
}
