import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

// - add Item Into Cart
export const addItemIntoCart = (
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

// - Update Cart
// export const updateProduct = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const data = req.body;

//   const schema = Joi.object({
//     _id: Joi.string().required(),
//   });

//   const { error } = schema.validate(data);
//   if (error) return res.status(404).send(error.message);
//   console.log("- Validation Done");
//   next();
// };

// - remove cart item
export const removeCartItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({ itemId: Joi.string().required() });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};
