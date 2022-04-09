import { JsonObject } from 'swagger-ui-express';

import { ErrorResource } from '../resource/error';
import { GeoLocationResource } from '../resource/geo-location';
import { HealthCheckResource } from '../resource/health-check';

export const OPEN_API: JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'Urban API',
    description: 'Urban hiring home task API',
    version: '1.0.0',
  },
  paths: {
    ['/_health']: {
      get: {
        summary: 'Does a health check',
        description: 'Returns successful health check',
        tags: ['HealthCheck'],
        responses: {
          200: {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthCheckResource',
                },
              },
            },
          },
        },
      },
    },
    ['/geolocation']: {
      get: {
        summary: 'Retrieve area',
        description: 'Returns address location information',
        tags: ['Geolocation'],
        parameters: [
          {
            name: 'address',
            required: true,
            in: 'query',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GeoLocationResource',
                },
              },
            },
          },
          400: {
            description: 'Bad Request Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResource',
                },
              },
            },
          },
          404: {
            description: 'Not Found Response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResource',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      HealthCheckResource: HealthCheckResource.SCHEMA,
      GeoLocationResource: GeoLocationResource.SCHEMA,
      ErrorResource: ErrorResource.SCHEMA,
    },
  },
};
