import 'dotenv/config';

export type Config = typeof config;

export const config = {
  app: {
    port: Number(process.env.PORT) || 9000,
  },
  googleMapsProvider: {
    enabled: process.env.GOOGLE_MAPS_ENABLED !== 'false',
    apiKey: process.env.GOOGLE_MAPS_KEY || 'unknown',
  },
  openCageProvider: {
    enabled: process.env.OPEN_CAGE_ENABLED !== 'false',
    apiKey: process.env.OPEN_CAGE_KEY || 'unknown',
  }
};
