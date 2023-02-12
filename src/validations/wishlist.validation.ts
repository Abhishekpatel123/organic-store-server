import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

// - add Item Into Cart
export const addItemIntoWishlist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const schema = Joi.object({
    itemId: Joi.string().required()
  });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log('- Validation Done');
  next();
};
