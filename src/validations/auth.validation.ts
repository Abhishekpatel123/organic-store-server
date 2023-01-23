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
  if (error) return res.status(404).send(error.message);
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
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};

export const address = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    pinCode: Joi.number().required(),
    locality: Joi.string().required(),
    areaAndStreet: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    landmark: Joi.string(),
    alternativePhone: Joi.string(),
    addressType: Joi.string().allow("Home", "Work").required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};

export const updateAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({
    addressId: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    pinCode: Joi.number().required(),
    locality: Joi.string().required(),
    areaAndStreet: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    landmark: Joi.string(),
    alternativePhone: Joi.string(),
    addressType: Joi.string().allow("Home", "Work").required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};

// remove address
export const removeAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({
    addressId: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};

// making this address to shipping address
export const makeShippingAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.params;

  const schema = Joi.object({
    addressId: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};
