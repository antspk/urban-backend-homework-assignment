import { json } from 'body-parser';
import * as express from 'express';

import { config } from './config';
import { controller as geolocationController } from './controllers/geo-location';
import { errorHandler } from './lib/errors/express-error-handler';

const app = express();

app.use(json());
geolocationController(app);
app.use(errorHandler);

export { app, config };
