import { v4 as uuidv4 } from "uuid";
import { ProductModel } from "../database/models";
import { ProductInterface } from "../database/models/ProductModel";
import BaseError from "../errors/base-error";

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
  const product = await ProductModel.findOne({ _id: productId });
  if (!product) return { orders: null, message: "No Product found." };
  return { product, message: "Product fetched successfully." };
};

export const topRatedProduct = async ({ limit = 10 }: { limit?: number }) => {
  const product = await ProductModel.find({})
    .sort({ avgRating: -1 })
    .limit(limit);
  if (!product) return { product: null, message: "No product found." };
  return { product, message: "Product fetched successfully." };
};

export const latestProduct = async ({ limit = 10 }: { limit?: number }) => {
  const product = await ProductModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit);
  if (!product) return { product: null, message: "No product found." };
  return { product, message: "Product fetched successfully." };
};

export const removeProduct = async (id: ProductInterface["_id"]) => {
  const product = await ProductModel.findOne({ _id: id });
  if (!product) throw BaseError.badRequest("Product not exist.");

  await ProductModel.findByIdAndDelete(id);
  return { message: "Product removed successfully." };
};
