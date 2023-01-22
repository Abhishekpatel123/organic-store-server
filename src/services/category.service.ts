import { v4 as uuidv4 } from "uuid";
import { CategoryModel } from "../database/models";
import ErrorHandler from "../Error";

import * as utils from "../utils";

export const createCategory = async ({
  name,
  file,
}: {
  name: string;
  file: any;
}) => {
  if (file) {
    const isAlreadyExist = await CategoryModel.findOne({ name });
    if (isAlreadyExist) {
      throw ErrorHandler.BadRequest("Category Name already exists");
    }
    const fileUrl = await utils.uploadFile(file.path, `category-${uuidv4()}`);
    const category = await CategoryModel.create({
      name,
      imageUrl: fileUrl,
    });
    return { category, message: "Category updated successfully." };
  }
};

export const fetchCategories = async () => {
  const categories = await CategoryModel.find({});
  return { categories, message: "Categories fetched successfully." };
};

export const removeCategory = async (id: string) => {
  const category = await CategoryModel.findOne({ _id: id });
  if (!category) throw ErrorHandler.BadRequest("Category not exist.");

  await CategoryModel.findByIdAndDelete(id);
  return { message: "Categories removed successfully." };
};
