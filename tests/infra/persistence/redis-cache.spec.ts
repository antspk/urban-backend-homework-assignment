import cache from 'cache-manager';
import { expect } from 'chai';
import { stub } from 'sinon';

import { RedisCache } from '../../../app/infra/persistence/redis-cache';
import { FAKE_CACHE } from './fake-cache';

describe('infra/persistence/redis-cache', () => {
  describe('RedisCache', () => {
    it('should return provided value', async () => {
      stub(cache, 'caching').returns(FAKE_CACHE as never);

      const result = await new RedisCache({ ttl: 0, host: 'localhost', port: 0 }).wrap('test', async () => 'test');

      expect(result).to.eq('test');
    });
  });
});
