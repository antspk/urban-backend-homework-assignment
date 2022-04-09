import { json } from 'body-parser';
import * as express from 'express';

import { controller as geolocationController } from './api/controllers/geo-location';
import { errorHandler } from './api/errors/express-error-handler';
import { config } from './config';

const app = express();

app.use(json());
geolocationController(app);
app.use(errorHandler);

export { app, config };
