export abstract class ErrorBase extends Error {
  public code: string;
  public statusCode: number;
}