import { Request, Response } from "express";
import * as services from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { itemId, quantity = 1 } = req.body;
  let response;
  if (itemId && quantity) {
    response = await services.buySingleItem(userId, { itemId, quantity });
  } else {
    response = await services.buyItemFromCart(userId);
  }
  res.status(200).json(response);
};

export const fetchOrders = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.fetchOrders(userId);
  res.status(200).json(response);
};

export const fetchOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const response = await services.fetchOrder(orderId);
  res.status(200).json(response);
};
