import { Response, Request } from "express";
import * as services from "../services/auth.service";
import { httpStatusCodes } from "../constants/response.constant";

export const otpGenerator = async (req: Request, res: Response) => {
  const { email } = req.body;
  const data = await services.otpGenerator(email);
  res.status(httpStatusCodes.CREATED).send(data);
};

export const otpVerify = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const data = await services.otpVerify(email, otp);
  res.status(httpStatusCodes.OK).json(data);
};

export const getUser = (req: Request, res: Response) => {
  const data = req.user;
  res.status(httpStatusCodes.OK).json({ user: data });
};

export const updateUser = async (req: Request, res: Response) => {
  const data = req.body;
  const response = await services.updateUser({
    userId: req.user._id.toString(),
    data,
  });
  res.status(httpStatusCodes.OK).json(response);
};
