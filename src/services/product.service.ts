import { v4 as uuidv4 } from "uuid";
import { ProductModel } from "../database/models";
import { ProductInterface } from "../database/models/ProductModel";
import ErrorHandler from "../Error";

import * as utils from "../utils";

export const createProduct = async (data: ProductInterface) => {
  const product = await ProductModel.create(data);
  return { product, message: "Product updated successfully." };
};

export const fetchProducts = async (categoryId: string) => {
  // Filter by category
  const products = await ProductModel.find({ category: categoryId });
  return { products, message: "Product fetched successfully." };
};

export const fetchProduct = async (productId: string) => {
  // Filter by category
  const product = await ProductModel.findOne({ _id: productId });
  if (!product) throw ErrorHandler.BadRequest("Product not exist");
  return { product, message: "Product fetched successfully." };
};

export const removeProduct = async (id: ProductInterface["_id"]) => {
  const product = await ProductModel.findOne({ _id: id });
  if (!product) throw ErrorHandler.BadRequest("Product not exist.");

  await ProductModel.findByIdAndDelete(id);
  return { message: "Product removed successfully." };
};
