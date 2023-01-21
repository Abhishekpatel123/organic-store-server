import { NextFunction, Request, Response } from "express";
import { UserModel } from "../database/models";
import { UserInterface } from "../database/models/UserModel";
import { verifyToken } from "../services";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
      token?: string;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send({ message: "Your request does not contain Bearer token" });
  try {
    const decoded: any = await verifyToken(token);
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user)
      return res
        .status(404)
        .send({ message: "User not found or Access token has expired" });
    req.token = token;
    req.user = user;
    console.log("- AUTHORIZATION DONE");
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};

export default authenticate;