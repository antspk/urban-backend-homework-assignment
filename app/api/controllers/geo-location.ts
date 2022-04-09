import { Request, Response } from 'express';
import { constants } from 'http2';

import { AddressLookup } from '../../domain/models/address-lookup';

export class GeoLocationController {
  constructor(private addressLookup: AddressLookup) {}

  async geoLocationHandler(req: Request, res: Response): Promise<void> {
    const data = await this.addressLookup.lookup(req.query.address as string);

    res.status(constants.HTTP_STATUS_OK).json({
      status: 'OK',
      search: req.query.address as string,
      location: data,
    });
  }
}
