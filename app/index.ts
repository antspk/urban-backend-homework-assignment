import { app, config } from './app';

app.listen(config.app.port, () => {
  console.log(`Listening on ${config.app.port}`);
});