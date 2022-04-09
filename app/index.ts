import { app, config } from './app';

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${config.app.port}`);
});
