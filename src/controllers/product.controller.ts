import { Request, Response } from 'express';
import { httpStatusCodes } from '../constants/response.constant';
import * as services from '../services/product.service';
import { ImageType } from '../types';

export const createProduct = async (req: Request, res: Response) => {
  const response = await services.createProduct(req.body);
  res.status(httpStatusCodes.CREATED).json(response);
};

export const uploadProductImages = async (req: Request, res: Response) => {
  const images = req.files as ImageType[];
  const productId = req.body.productId;
  const response = await services.uploadProductImages({ productId, images });
  res.status(httpStatusCodes.CREATED).json(response);
};

export const fetchProducts = async (req: Request, res: Response) => {
  const categoryName = req.params.categoryName;
  const response = await services.fetchProducts(categoryName);
  res.status(httpStatusCodes.OK).json(response);
};

export const fetchProduct = async (req: Request, res: Response) => {
  const sku = req.params.sku;
  const response = await services.fetchProduct(sku);
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

export const searchProducts = async (req: Request, res: Response) => {
  const { keyword } = req.query as { keyword: string };
  const response = await services.searchProducts(keyword);
  res.status(httpStatusCodes.OK).json(response);
};
