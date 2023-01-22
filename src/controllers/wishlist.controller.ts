import { Request, Response } from "express";
import * as services from "../services/wishlist.service";

export const addItemIntoWishlist = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { itemId } = req.body;

  const response = await services.addItemIntoWishlist(userId, itemId);
  res.status(200).json(response);
};

export const fetchWishlist = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.fetchWishlist(userId);
  res.status(200).json(response);
};

export const removeWishlistItem = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  const userId = req.user._id;
  const response = await services.removeWishlistItem(userId, itemId);
  res.status(200).json(response);
};
