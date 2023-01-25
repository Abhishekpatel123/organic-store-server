import { Request, Response } from "express";
import { httpStatusCodes } from "../constants/response.constant";
import * as services from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  const response = await services.createProduct(req.body);
  res.status(httpStatusCodes.CREATED).json(response);
};

export const fetchProducts = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const response = await services.fetchProducts(categoryId);
  res.status(httpStatusCodes.OK).json(response);
};

export const fetchProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const response = await services.fetchProduct(productId);
  res.status(httpStatusCodes.OK).json(response);
};

export const topRatedProduct = async (req: Request, res: Response) => {
  const response = await services.topRatedProduct({});
  res.status(httpStatusCodes.OK).json(response);
};

export const latestProduct = async (req: Request, res: Response) => {
  // const data = { limit: 10 };
  const response = await services.latestProduct({});
  res.status(httpStatusCodes.OK).json(response);
};

export const removeProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const response = await services.removeProduct(id);
  res.status(httpStatusCodes.OK).json(response);
};
