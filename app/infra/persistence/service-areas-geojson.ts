import { GeoJSON } from 'geojson';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const geoJSON = require('./formatted-data.json');

export function getGeoJSON(): GeoJSON {
  return geoJSON;
}
