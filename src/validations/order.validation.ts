import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

// - fetch one order by id
export const fetchOrder = (req: Request, res: Response, next: NextFunction) => {
  const data = req.params;
  const schema = Joi.object({ orderId: Joi.string().required() });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};

// - Crate order
export const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const schema = Joi.object({
    itemId: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};
