import { GeoJSON } from 'geojson';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const json = require('./formatted-data.json');

export function getGeoJson(): GeoJSON {
  return json as unknown as GeoJSON;
}
