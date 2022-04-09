import { json } from 'body-parser';
import * as express from 'express';
import { controller as geolocationController } from './controllers/geo-location';
import { errorHandler } from './lib/errors/express-error-handler';
import { config } from './config';

const app = express();

app.use(json());
geolocationController(app);
app.use(errorHandler);

export {
  app,
  config
}
