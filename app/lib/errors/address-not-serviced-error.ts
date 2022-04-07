import { constants } from 'http2';
import { ErrorBase } from './error-base';

export class AddressNotServicedError extends ErrorBase {
  constructor(address: string) {
    super(`Address ${address} is outside service area`);
  }

  code = 'ADDRESS_NOT_SERVICED';
  statusCode = constants.HTTP_STATUS_BAD_REQUEST;
}
