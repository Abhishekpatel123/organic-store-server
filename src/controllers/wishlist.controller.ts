import { Request, Response } from 'express';
import { httpStatusCodes } from '../constants/response.constant';
import * as services from '../services/wishlist.service';

export const addItemIntoWishlist = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { itemId } = req.body;

  const response = await services.addItemIntoWishlist(userId, itemId);
  res.status(httpStatusCodes.CREATED).json(response);
};

export const fetchWishlist = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.fetchWishlist(userId);
  res.status(httpStatusCodes.OK).json(response);
};

export const deleteWishlistItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const userId = req.user._id;
  const response = await services.deleteWishlistItem(userId, itemId);
  res.status(httpStatusCodes.OK).json(response);
};
