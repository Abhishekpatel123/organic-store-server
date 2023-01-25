import { Request, Response } from "express";
import { httpStatusCodes } from "../constants/response.constant";
import { CategoryModel } from "../database/models";
import * as services from "../services/category.service";
import * as utils from "../utils";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const response = await services.createCategory({ name, file: req.file });
  res.status(httpStatusCodes.CREATED).json(response);
};

export const fetchCategories = async (req: Request, res: Response) => {
  const response = await services.fetchCategories();
  res.status(httpStatusCodes.OK).json(response);
};

export const removeCategory = async (req: Request, res: Response) => {
  const { id } = req.body;
  const response = await services.removeCategory(id);
  res.status(httpStatusCodes.OK).json(response);
};
