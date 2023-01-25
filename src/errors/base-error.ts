import { httpStatusCodes } from "../constants/response.constant";

class BaseError extends Error {
  // public readonly methodName: string;
  public readonly statusCode: number;
  public readonly message: string;
  public readonly isOperational?: boolean;

  constructor(
    // methodName: string,
    message: string,
    statusCode: number,
    isOperational: boolean = true
  ) {
    super(<string>message);
    // this.methodName = methodName;
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;

    // Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static badRequest(msg: string = "") {
    return new BaseError(msg, httpStatusCodes.BAD_REQUEST);
  }

  static notFound(msg: string = "") {
    return new BaseError(msg, httpStatusCodes.NOT_FOUND);
  }

  static unAuthorized(msg: string = "") {
    return new BaseError(msg, httpStatusCodes.UNAUTHORIZED);
  }

  static internalServer(msg: string = "") {
    return new BaseError(msg, httpStatusCodes.UNAUTHORIZED);
  }

  static customError(status: number, msg: string = "") {
    return new BaseError(msg, status);
  }
}

export default BaseError;
