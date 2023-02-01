import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import constants from "../constants";

// - Otp Generator
export const otpGenerator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(data);
  if (error) return next(error);
  console.log("- Validation Done");
  next();
};

// - Verify Otp
export const otpVerify = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(constants.OTP_LENGTH).required(),
  });

  const { error } = schema.validate(data);
  if (error) return next(error);
  console.log("- Validation Done");
  next();
};

// - Update user
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  const schema = Joi.object({
    name: Joi.string(),
    phone: Joi.string().length(10),
  });

  const { error } = schema.validate(data);
  if (error) return next(error);
  console.log("- Validation Done");
  next();
};
