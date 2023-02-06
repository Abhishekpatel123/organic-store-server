import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

const productCommonSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  manufacture_details: Joi.object().keys().max(5),
  pricing: Joi.object({
    basePrice: Joi.number().required(),
    currency: Joi.string().required(),
    discount: Joi.number().required()
  }).required(),
  imageUrl: Joi.string(),
  images: Joi.array(),
  countInStock: Joi.number().required(),
  category: Joi.string().required()
});

// - Create Product
export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const schema = productCommonSchema;

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log('- Validation Done');
  next();
};

// - Update Product
export const updateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = productCommonSchema.concat(
    Joi.object({
      _id: Joi.string().required()
    })
  );

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log('- Validation Done');
  next();
};

// - Update Product
export const removeProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  const schema = Joi.object({ id: Joi.string().required() });

  const { error } = schema.validate(data);
  if (error) return res.status(404).send(error.message);
  console.log('- Validation Done');
  next();
};

// - Fetch Products by category
// - Fetch single Product
// params does not need validation
