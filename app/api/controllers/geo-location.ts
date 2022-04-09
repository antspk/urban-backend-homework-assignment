import { Request, Response } from 'express';
import { constants } from 'http2';

import { AddressLookup } from '../../domain/models/address-lookup';
import { GeoLocationResource } from '../resource/geo-location';
import { GeoLocationQuery } from '../validators/geo-location';

export class GeoLocationController {
  constructor(private addressLookup: AddressLookup) {}

  async geoLocationHandler(req: Request, res: Response): Promise<void> {
    const query = GeoLocationQuery.from(req);

    const data = await this.addressLookup.lookup(query.address);

    res.status(constants.HTTP_STATUS_OK).json(GeoLocationResource.from(query, data));
  }
}
