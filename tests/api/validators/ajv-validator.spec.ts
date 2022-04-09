import { expect } from 'chai';

import { validate } from '../../../app/api/validators/ajv-validator';

describe('api/validators/ajv-validator', () => {
  describe('validate', () => {
    it('should throw and error, when validator unregistered schema', () => {
      const throwable = (): void => validate('test', {});

      expect(throwable).to.throw('test s');
    });
  });
});
