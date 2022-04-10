import { Client } from '@googlemaps/google-maps-services-js';
import { geocoder } from 'geocoder-opencagedata';
import { GeoJSON } from 'geojson';

import { GeoLocationController } from './api/controllers/geo-location';
import { HealthCheckController } from './api/controllers/health-check';
import { config } from './config';
import { AddressLookupService } from './domain/services/adress-lookup-service';
import { LocationProviderService } from './domain/services/location-provider-service';
import { GoogleMapsLocationProvider } from './infra/clients/googlemaps-provider';
import { OpenCageLocationProvider } from './infra/clients/opencage-provider';
import { default as geoJSON } from './infra/persistence/formatted-data.json';
import { RedisCache } from './infra/persistence/redis-cache';
import { GeoJsonServiceAreaLookup } from './infra/persistence/service-areas-lookup';

export const areaLookup = new GeoJsonServiceAreaLookup(geoJSON as unknown as GeoJSON);

export const openCageLocationProvider = new OpenCageLocationProvider({
  client: new geocoder({ api_key: config.openCageProvider.apiKey }),
  enabled: config.openCageProvider.enabled,
  cache: config.openCageProvider.cache,
});

export const googleMapsLocationProvider = new GoogleMapsLocationProvider({
  apiKey: config.googleMapsProvider.apiKey,
  enabled: config.openCageProvider.enabled,
  client: new Client({}),
  cache: config.googleMapsProvider.cache,
});

export const providers = [openCageLocationProvider, googleMapsLocationProvider];
export const locationProviderService = new LocationProviderService(providers, new RedisCache(config.cache));
export const addressLookupService = new AddressLookupService(locationProviderService, areaLookup);

// controllers
export const healthCheckController = new HealthCheckController();
export const geoLocationController = new GeoLocationController(addressLookupService);
