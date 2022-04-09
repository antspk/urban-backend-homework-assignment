import { constants } from 'http2';

import { BaseError } from './base-error';

export class AddressNotServicedError extends BaseError {
  constructor(address: string) {
    super(`Address ${address} is outside service area`);
  }

  override code = 'ADDRESS_NOT_SERVICED';

  override statusCode = constants.HTTP_STATUS_BAD_REQUEST;
}
