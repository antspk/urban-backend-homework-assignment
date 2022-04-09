export class HealthCheckResource {
  readonly status = 'UP';

  static from(): HealthCheckResource {
    return new HealthCheckResource();
  }
}
