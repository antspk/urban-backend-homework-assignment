import { Application, Request, Response } from 'express';
import { constants } from 'http2';
import { callbackify } from 'util';

import { config } from '../../config';
import { AddressLookupService } from '../../domain/services/adress-lookup-service';
import { SequentialProvider } from '../../domain/services/sequential-provider';
import { GoogleMapsLocationProvider } from '../../infra/clients/googlemaps-provider';
import { OpenCageLocationProvider } from '../../infra/clients/opencage-provider';
import { getGeoJSON } from '../../infra/persistence/service-areas-geojson';
import { GeoJsonServiceAreaLookup } from '../../infra/persistence/service-areas-lookup';

const areaLookup = new GeoJsonServiceAreaLookup(getGeoJSON());

const locationProvider = new SequentialProvider([
  OpenCageLocationProvider.factory(config),
  GoogleMapsLocationProvider.create(config),
]);

const addressLookup = new AddressLookupService(locationProvider, areaLookup);

export function controller(app: Application): void {
  app.get(
    '/geolocation',
    callbackify(async (req: Request, res: Response) => {
      const data = await addressLookup.lookup(req.query.address as string);

      res.status(constants.HTTP_STATUS_OK).json({
        status: 'OK',
        search: req.query.address as string,
        location: data,
      });
    }),
  );
}
