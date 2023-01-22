import { Request, Response } from "express";
import { CategoryModel } from "../database/models";
import * as services from "../services/category.service";
import * as utils from "../utils";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const response = await services.createCategory({ name, file: req.file });
  res.status(200).json(response);
};

export const fetchCategories = async (req: Request, res: Response) => {
  const response = await services.fetchCategories();
  res.status(200).json(response);
};

export const removeCategory = async (req: Request, res: Response) => {
  const { id } = req.body;
  const response = await services.removeCategory(id);
  res.status(200).json(response);
};
