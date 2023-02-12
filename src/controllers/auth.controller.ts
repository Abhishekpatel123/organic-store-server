import { Response, Request } from 'express';
import * as services from '../services/auth.service';
import { httpStatusCodes } from '../constants/response.constant';

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
    data
  });
  res.status(httpStatusCodes.OK).json(response);
};

export const deleteUser = async (req: Request, res: Response) => {
  req.user.delete();
  const response = { message: 'User deleted successfully.' };
  res.status(httpStatusCodes.OK).json(response);
};

export const logoutUser = async (req: Request, res: Response) => {
  req.user.set(
    'tokens',
    req.user.tokens.filter(({ token }) => token !== req.token)
  );
  await req.user.save();
  const response = { message: 'Successfully logged out.' };
  res.status(httpStatusCodes.OK).json(response);
};
