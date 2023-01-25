import { Request, Response } from "express";
import { httpStatusCodes } from "../constants/response.constant";
import * as services from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  const user = req.user;
  const { itemId, quantity = 1 } = req.body;
  let response;
  if (itemId && quantity) {
    const data = { user, itemId, quantity };
    response = await services.buySingleItem(data);
  } else {
    const data = { user };
    response = await services.buyItemFromCart(data);
  }
  res.status(httpStatusCodes.CREATED).json(response);
};

export const fetchOrders = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await services.fetchOrders(userId);
  res.status(httpStatusCodes.OK).json(response);
};

export const fetchOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const response = await services.fetchOrder(orderId);
  res.status(httpStatusCodes.OK).json(response);
};
