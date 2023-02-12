import { Request, Response } from 'express';
import { httpStatusCodes } from '../constants/response.constant';
import { CategoryModel } from '../database/models';
import * as services from '../services/category.service';
import { ImageType } from '../types';

export const createCategory = async (
  req: Request<{}, {}, { name: string }>,
  res: Response
) => {
  const { name } = req.body;
  const response = await services.createCategory({
    name,
    file: req.file as ImageType
  });
  res.status(httpStatusCodes.CREATED).json(response);
};

export const updateCategory = async (
  req: Request<{}, {}, { name?: string; categoryId: string }>,
  res: Response
) => {
  const { name, categoryId } = req.body;
  const response = await services.updateCategory({
    data: { name, categoryId },
    file: req.file
  });
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
