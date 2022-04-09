import { Client } from '@googlemaps/google-maps-services-js';
import { geocoder } from 'geocoder-opencagedata';

import { GeoLocationController } from './api/controllers/geo-location';
import { config } from './config';
import { AddressLookupService } from './domain/services/adress-lookup-service';
import { SequentialProvider } from './domain/services/sequential-provider';
import { GoogleMapsLocationProvider } from './infra/clients/googlemaps-provider';
import { OpenCageLocationProvider } from './infra/clients/opencage-provider';
import { getGeoJSON } from './infra/persistence/service-areas-geojson';
import { GeoJsonServiceAreaLookup } from './infra/persistence/service-areas-lookup';

export const areaLookup = new GeoJsonServiceAreaLookup(getGeoJSON());

export const openCageLocationProvider = new OpenCageLocationProvider({
  client: new geocoder({ api_key: config.openCageProvider.apiKey }),
  enabled: config.openCageProvider.enabled,
  order: config.openCageProvider.order,
});

export const googleMapsLocationProvider = new GoogleMapsLocationProvider({
  apiKey: config.googleMapsProvider.apiKey,
  enabled: config.openCageProvider.enabled,
  client: new Client({}),
  order: config.googleMapsProvider.order,
});

export const locationProvider = new SequentialProvider([openCageLocationProvider, googleMapsLocationProvider]);

export const addressLookup = new AddressLookupService(locationProvider, areaLookup);

export const geoLocationController = new GeoLocationController(addressLookup);
