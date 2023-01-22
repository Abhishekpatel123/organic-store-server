class ErrorHandler {
  msg: string;
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    // super();
    this.msg = msg;
    this.statusCode = statusCode;
  }

  static BadRequest(msg: string) {
    return new ErrorHandler(msg, 400);
  }
}

export default ErrorHandler;
