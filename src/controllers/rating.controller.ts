import { Request, Response } from 'express';
import { httpStatusCodes } from '../constants/response.constant';
import * as service from '../services/rating.service';

export const doRating = async (req: Request, res: Response) => {
  const data = req.body;
  const rate = { userId: req.user._id, ...data };
  const response = await service.doRating(rate);
  res.status(httpStatusCodes.CREATED).send(response);
};

export const fetchRatingAndReview = async (req: Request, res: Response) => {
  const data = { productId: req.params.productId };
  const response = await service.fetchRatingAndReview(data);
  res.status(httpStatusCodes.OK).send(response);
};
