import { Request, Response } from 'express';
import { constants } from 'http2';

import { HealthCheckResource } from '../resource/health-check';

export class HealthCheckController {
  async healthCheckHandler(req: Request, res: Response): Promise<void> {
    res.status(constants.HTTP_STATUS_OK).json(HealthCheckResource.from());
  }
}
