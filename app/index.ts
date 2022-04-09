import { app } from './app';
import { config } from './config';

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${config.app.port}`);
});
