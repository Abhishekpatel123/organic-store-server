import { NextFunction, Request, Response } from "express";
import { UserModel } from "../database/models";
import { UserInterface } from "../database/models/UserModel";
import BaseError from "../errors/base-error";
import * as utils from "../utils";

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
      token: string;
    }
  }
}

// - Admin Authorization will do later
// - Role (ADMIN, USER)
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return next(BaseError.unAuthorized("Your request does not with token"));

  try {
    const decoded: any = await utils.verifyToken(token);
    const query = {
      email: decoded.email,
      "tokens.token": token,
    };
    const user = await UserModel.findOne(query);
    if (!user)
      return next(
        BaseError.badRequest("User not found or Access token has expired")
      );

    req.token = token;
    req.user = user;
    console.log("- AUTHORIZATION DONE");
    next();
  } catch (err: any) {
    return next(BaseError.unAuthorized(err.message));
  }
};

export default authenticate;
