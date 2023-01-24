import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

export const doRating = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ratingValue: Joi.number().required(),
    userName: Joi.string().required(),
    productId: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log("- Validation Done");
  next();
};
