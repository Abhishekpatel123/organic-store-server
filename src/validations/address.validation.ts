import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import constants from '../constants';

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
    addressType: Joi.string().allow('Home', 'Work').required()
  });

  const { error } = schema.validate(data);
  if (error) return next(error);
  console.log('- Validation Done');
  next();
};

export const updateAddress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    pinCode: Joi.number().required(),
    locality: Joi.string().required(),
    areaAndStreet: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    landmark: Joi.string(),
    alternativePhone: Joi.string(),
    addressType: Joi.string().allow('Home', 'Work').required()
  });

  const { error } = schema.validate(data);
  if (error) return next(error);
  console.log('- Validation Done');
  next();
};
