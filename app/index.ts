import { app, logger } from './app';
import { config } from './config';

app.listen(config.app.port, () => {
  logger.logger.info(`Listening on ${config.app.port}`);
});
