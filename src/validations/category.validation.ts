import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import constants from "../constants";

// - Create category
export const crateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};

// - remove category
export const removeCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};
