export abstract class BaseError extends Error {
  public abstract code: string;

  public abstract statusCode: number;
}
