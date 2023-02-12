import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import constants from '../constants';

// - Create category
export const crateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const image = req.file;

  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.object().required()
  });

  const { error } = schema.validate({ ...data, image });
  if (error) return res.status(404).send(error.message);
  console.log('- Validation Done');
  next();
};

// - Create category
export const updateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const image = req.file;
  console.log(data, 'data');
  const schema = Joi.object({
    name: Joi.string(),
    categoryId: Joi.string().required(),
    image: Joi.object()
  });

  const { error } = schema.validate({ ...data, image });
  if (error) return res.status(404).send(error.message);
  console.log('- Validation Done');
  next();
};
