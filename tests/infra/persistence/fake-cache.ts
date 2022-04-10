import { Cache } from '../../../app/domain/models/cache';

export const FAKE_CACHE: Cache = {
  async wrap<T>(key: string, provider: () => Promise<T>): Promise<T> {
    return await provider();
  },
};
