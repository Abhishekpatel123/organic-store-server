import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "------------------ err middleware");
//   if (err instanceof ValidationError) {
//     return res
//       .status(400)
//       .send({ type: "ValidationError", message: err.message });
//   }
  return res.status(400).send(err);
};

export default errorHandler;
