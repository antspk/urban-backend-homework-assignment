import { GeoJSON } from 'geojson';

import { GeoLocationController } from './api/controllers/geo-location';
import { HealthCheckController } from './api/controllers/health-check';
import { config } from './config';
import { AddressLookupService } from './domain/services/adress-lookup-service';
import { SequentialProvider } from './domain/services/sequential-provider';
import { GoogleMapsLocationProvider } from './infra/clients/googlemaps-provider';
import { OpenCageLocationProvider } from './infra/clients/opencage-provider';
import { default as geoJSON } from './infra/persistence/formatted-data.json';
import { GeoJsonServiceAreaLookup } from './infra/persistence/service-areas-lookup';

export const areaLookup = new GeoJsonServiceAreaLookup(geoJSON as unknown as GeoJSON);
export const openCageLocationProvider = OpenCageLocationProvider.factory(config);
export const googleMapsLocationProvider = GoogleMapsLocationProvider.create(config);
export const locationProvider = new SequentialProvider([openCageLocationProvider, googleMapsLocationProvider]);
export const addressLookup = new AddressLookupService(locationProvider, areaLookup);
export const healthCheckController = new HealthCheckController();
export const geoLocationController = new GeoLocationController(addressLookup);
