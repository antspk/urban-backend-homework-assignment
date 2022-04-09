import { expect } from 'chai';

import { ErrorResource } from '../../../app/api/resource/error';

describe('api/resources/error', () => {
  describe('from', () => {
    it('should include stack, when is is available', () => {
      const error = new Error('Fake error');
      error.stack = 'Error:\n';

      const resource = ErrorResource.from(error, true);

      expect(resource).to.deep.eq({
        errors: undefined,
        message: 'An unexpected error occurred',
        stack: ['Error:', ''],
        status: 'INTERNAL_SERVER_ERROR',
      });
    });

    it('should exclude stack, when it is not available', () => {
      const error = new Error('Fake error');
      delete error.stack;

      const resource = ErrorResource.from(error, true);

      expect(resource).to.deep.eq({
        errors: undefined,
        message: 'An unexpected error occurred',
        stack: undefined,
        status: 'INTERNAL_SERVER_ERROR',
      });
    });
  });
});
