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

export const fetchCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find({});
    res
      .status(200)
      .json({ categories, message: "Categories fetched successfully." });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const category = await CategoryModel.findOne({ _id: id });
    if (!category)
      return res.status(404).send({ message: "Category not exist." });

    await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Categories removed successfully." });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};
