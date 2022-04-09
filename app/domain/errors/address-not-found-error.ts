import { constants } from 'http2';

import { BaseError } from './base-error';

export class AddressNotFoundError extends BaseError {
  constructor(address: string) {
    super(`Address ${address} not found`);
  }

  override code = 'ADDRESS_NOT_FOUND';

  override statusCode = constants.HTTP_STATUS_NOT_FOUND;
}
