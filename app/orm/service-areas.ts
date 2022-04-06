import { GeoJSON } from 'geojson';

const json = require('./formatted-data.json');

export function getGeoJson() {
  return json as GeoJSON;
}
