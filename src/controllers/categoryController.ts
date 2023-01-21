import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CategoryModel } from "../database/models";

import { uploadFile } from "../services";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (req.file) {
      const fileUrl = await uploadFile(req.file.path, `category-${uuidv4()}`);
      const category = await CategoryModel.create({
        name,
        imageUrl: fileUrl,
      });
      res
        .status(200)
        .json({ category, message: "Category updated successfully." });
    }
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};
