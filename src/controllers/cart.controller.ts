import { Request, Response } from 'express';
import { httpStatusCodes } from '../constants/response.constant';
import * as services from '../services/cart.service';

export const addItemIntoCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { itemId, quantity } = req.body;

  const response = await services.addItemIntoCart(userId, itemId, quantity);
  res.status(httpStatusCodes.CREATED).json(response);
};

export const fetchCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.fetchCart(userId);
  res.status(httpStatusCodes.OK).json(response);
};

export const getBilling = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.getBilling(userId);
  res.status(httpStatusCodes.OK).json(response);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const itemId = req.body.id;
  const userId = req.user._id;
  const response = await services.deleteCartItem(userId, itemId);
  res.status(httpStatusCodes.OK).json(response);
};

export const fetchItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const response = await services.fetchItemById({
    itemId,
    userId: req.user._id.toString()
  });
  res.status(httpStatusCodes.OK).json(response);
};
