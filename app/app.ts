import { json } from 'body-parser';
import * as express from 'express';
import { default as pino } from 'pino-http';
import { serve, setup } from 'swagger-ui-express';
import { callbackify } from 'util';

import { OPEN_API } from './api/docs/openapi';
import { errorHandler } from './api/errors/express-error-handler';
import { geoLocationController, healthCheckController } from './container';

const app = express();
const logger = pino();

app.use(logger);
app.use(json());

app.use('/docs', serve, setup(OPEN_API));
app.get('/geolocation', callbackify(geoLocationController.geoLocationHandler.bind(geoLocationController)));
app.get('/_health', callbackify(healthCheckController.healthCheckHandler.bind(healthCheckController)));

app.use(errorHandler);

export { app, logger };
