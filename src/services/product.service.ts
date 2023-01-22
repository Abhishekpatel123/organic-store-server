import { v4 as uuidv4 } from "uuid";
import { ProductModel } from "../database/models";
import { ProductInterface } from "../database/models/ProductModel";
import ErrorHandler from "../Error";

import * as utils from "../utils";

export const createProduct = async (data: ProductInterface) => {
  const product = await ProductModel.create(data);
  return { product, message: "Product updated successfully." };
};

export const fetchProducts = async () => {
  const products = await ProductModel.find({});
  return { products, message: "Product fetched successfully." };
};

export const removeProduct = async (id: string) => {
  const product = await ProductModel.findOne({ _id: id });
  if (!product) throw ErrorHandler.BadRequest("Product not exist.");

  await ProductModel.findByIdAndDelete(id);
  return { message: "Product removed successfully." };
};
