import { Request, Response } from "express";
import * as services from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  const response = await services.createProduct(req.body);
  res.status(200).json(response);
};

export const fetchProducts = async (req: Request, res: Response) => {
  const response = await services.fetchProducts();
  res.status(200).json(response);
};

export const removeProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  const response = await services.removeProduct(id);
  res.status(200).json(response);
};
