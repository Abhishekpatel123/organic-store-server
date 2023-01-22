import { Request, Response } from "express";
import * as services from "../services/cart.service";

export const addItemIntoCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { itemId, quantity } = req.body;

  const response = await services.addItemIntoCart(userId, itemId, quantity);
  res.status(200).json(response);
};

export const fetchCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.fetchCart(userId);
  res.status(200).json(response);
};

export const removeCartItem = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  const userId = req.user._id;
  const response = await services.removeCartItem(userId, itemId);
  res.status(200).json(response);
};
