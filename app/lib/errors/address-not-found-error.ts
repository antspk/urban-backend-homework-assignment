import { constants } from 'http2';

import { ErrorBase } from './error-base';

export class AddressNotFoundError extends ErrorBase {
  constructor(address: string) {
    super(`Address ${address} not found`);
  }

  override code = 'ADDRESS_NOT_FOUND';

  override statusCode = constants.HTTP_STATUS_NOT_FOUND;
}
