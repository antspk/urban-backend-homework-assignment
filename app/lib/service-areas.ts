import { FeatureCollection } from 'geojson';
import { getGeoJson } from '../orm/service-areas';

export function findServiceArea(lat: number, lng: number) {
  const geoJson = getGeoJson() as FeatureCollection;
  return null;
}
