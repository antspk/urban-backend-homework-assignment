import { Application, Request, Response } from 'express';
import { constants } from 'http2';
import { callbackify } from 'util';

import { getCoordinatesByAddress } from '../lib/coordinates/get-by-address';

export function controller(app: Application): void {
  app.get(
    '/geolocation',
    callbackify(async (req: Request, res: Response) => {
      const data = await getCoordinatesByAddress(req.query.address as string);

      res.status(constants.HTTP_STATUS_OK).json({
        status: 'OK',
        search: req.query.address as string,
        location: data,
      });
    }),
  );
}
