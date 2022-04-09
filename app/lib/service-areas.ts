import {
  booleanWithin,
  Feature,
  FeatureCollection,
  featureCollection,
  Geometry,
  GeometryCollection,
  Point,
  point as createPoint,
} from '@turf/turf';

import { getGeoJson } from '../orm/service-areas';

function isCollection(geometry: Geometry | GeometryCollection): geometry is GeometryCollection {
  return (geometry as GeometryCollection).geometries !== undefined;
}

function isInGeometry(point: Feature<Point>, geometry: Geometry | GeometryCollection): boolean {
  if (isCollection(geometry)) {
    return geometry.geometries.find((item) => booleanWithin(point, item)) !== undefined;
  }

  return booleanWithin(point, geometry);
}

function findFeatureByPoint(point: Feature<Point>, collection: FeatureCollection): Feature | undefined {
  return collection.features.find((feature) => isInGeometry(point, feature.geometry));
}

export function findServiceArea(lat: number, lng: number): string | null {
  const geoJson = getGeoJson() as FeatureCollection;
  const collection = featureCollection(geoJson.features);
  const point = createPoint([lng, lat]);

  const feature = findFeatureByPoint(point, collection);

  return feature?.properties?.Name ?? null;
}
