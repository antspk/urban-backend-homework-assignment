import { Cache as CacheManager, caching } from 'cache-manager';
import { default as redis } from 'cache-manager-redis-store';

import { Config } from '../../config';
import { Cache } from '../../domain/models/cache';

export class RedisCache implements Cache {
  private cache: CacheManager;

  constructor(config: Config['cache']) {
    this.cache = caching({ store: redis, max: Infinity, ...config });
  }

  async wrap<T>(key: string, provider: () => Promise<T>): Promise<T> {
    return await this.cache.wrap(key, provider);
  }
}
