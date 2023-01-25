import { v4 as uuidv4 } from "uuid";
import { CategoryModel } from "../database/models";
import { CategoryInterface } from "../database/models/CategoryModel";
import BaseError from "../errors/base-error";

import * as utils from "../utils";

export const createCategory = async ({
  name,
  file,
}: {
  name: CategoryInterface["name"];
  file: any;
}) => {
  if (file) {
    const isAlreadyExist = await CategoryModel.findOne({ name });
    if (isAlreadyExist) {
      throw BaseError.badRequest("Same name category already exists");
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

export const removeCategory = async (id: CategoryInterface["_id"]) => {
  const category = await CategoryModel.findOne({ _id: id });
  if (!category) throw BaseError.badRequest("Category not exist.");

  await CategoryModel.findByIdAndDelete(id);
  return { message: "Categories removed successfully." };
};
