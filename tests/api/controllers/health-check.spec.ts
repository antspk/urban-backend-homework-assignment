import { expect } from 'chai';
import { default as request } from 'supertest';

import { app } from '../../../app/app';

describe('api/controllers/health-check', () => {
  describe('/_health (GET)', () => {
    it('should return services area location, when address is within services area', async () => {
      const response = await request(app).get('/_health');

      expect(response).to.deep.include({
        status: 200,
        body: {
          status: 'UP',
        },
      });
    });
  });
});
