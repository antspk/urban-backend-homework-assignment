import 'dotenv/config';

export type Config = typeof config;

export const config = {
  app: {
    port: Number(process.env.PORT) || 9000,
    debug: process.env.APP_DEBUG === 'true',
  },
  cache: {
    port: Number(process.env.CACHE_PORT) || 6379,
    host: process.env.CACHE_HOST || 'localhost',
    ttl: Number(process.env.CACHE_TTL) || 600000,
  },
  googleMapsProvider: {
    enabled: process.env.GOOGLE_MAPS_ENABLED !== 'false',
    apiKey: process.env.GOOGLE_MAPS_KEY || 'unknown',
    cache: process.env.GOOGLE_MAPS_CACHE === 'true',
  },
  openCageProvider: {
    enabled: process.env.OPEN_CAGE_ENABLED !== 'false',
    apiKey: process.env.OPEN_CAGE_KEY || 'unknown',
    cache: process.env.OPEN_CAGE_CACHE === 'true',
  },
};
