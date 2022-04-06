import { ErrorBase } from './error-base';

export class AddressNotServicedError extends ErrorBase {
  constructor(address: string) {
    super(`Address ${address} is outside service area`);
  }

  code = 'ADDRESS_NOT_SERVICED';
  statusCode = 400;
}
