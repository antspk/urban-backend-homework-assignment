import { json } from 'body-parser';
import * as express from 'express';
import { callbackify } from 'util';

import { errorHandler } from './api/errors/express-error-handler';
import { geoLocationController } from './container';

const app = express();

app.use(json());
app.get('/geolocation', callbackify(geoLocationController.geoLocationHandler.bind(geoLocationController)));

app.use(errorHandler);

export { app };
