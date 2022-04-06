import { json } from 'body-parser';
import { config } from 'dotenv';
import * as express from 'express';
import { controller as geolocationController } from './controllers/geo-location';
import { errorHandler } from './lib/errors/express-error-handler';

config();

const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 9000;

export const app = express();

app.use(json());

geolocationController(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
