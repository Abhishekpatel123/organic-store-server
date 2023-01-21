import { Request, Response } from "express";

export const createCategory = (req: Request, res: Response) => {
  try {
    console.log(req.file, "file");
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};
