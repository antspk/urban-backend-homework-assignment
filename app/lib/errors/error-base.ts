export abstract class ErrorBase extends Error {
  public abstract code: string;

  public abstract statusCode: number;
}
