import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import BaseError from "../errors/base-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "------------------ err middleware");

  // - If error is not operational error
  if (err instanceof BaseError && !err.isOperational) {
    next(err);
  }

  // - If error is operational
  if (err instanceof ValidationError)
    return res
      .status(400)
      .send({ type: "ValidationError", message: err.message });

  if (err instanceof BaseError)
    return res.status(err.statusCode || 500).send(err.message);

  return res.status(500).send(err.message);
};

export default errorHandler;
