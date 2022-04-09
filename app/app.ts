import { json } from 'body-parser';
import * as express from 'express';
import { default as pino } from 'pino-http';
import { callbackify } from 'util';

import { errorHandler } from './api/errors/express-error-handler';
import { geoLocationController } from './container';

const app = express();
const logger = pino();

app.use(logger);
app.use(json());
app.get('/geolocation', callbackify(geoLocationController.geoLocationHandler.bind(geoLocationController)));

app.use(errorHandler);

export { app, logger };
