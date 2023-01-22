import { Request, Response, NextFunction } from "express";

const tryCatch =
  (controllers: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllers(req, res, next);
    } catch (err) {
      console.log("try catch ", err);
      return next(err);
    }
  };

export default tryCatch;
