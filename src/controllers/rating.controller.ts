import { Request, Response } from "express";
import * as service from "../services/rating.service";

export const doRating = async (req: Request, res: Response) => {
  const data = req.body;
  const rate = { userId: req.user._id, ...data };
  const response = await service.doRating(rate);
  res.status(200).send(response);
};

export const fetchRatingAndReview = async (req: Request, res: Response) => {
  const data = { userId: req.user._id, productId: req.params.productId };
  const response = await service.fetchRatingAndReview(data);
  res.status(200).send(response);
};
