export interface Cache {
  wrap<T>(key: string, provider: () => Promise<T>): Promise<T>;
}
