import { v4 as uuidv4 } from "uuid";
import { CategoryModel, ProductModel } from "../database/models";
import { ProductInterface } from "../database/models/ProductModel";
import BaseError from "../errors/base-error";

export const createProduct = async (data: ProductInterface) => {
  const sku = `${data.category}-${uuidv4()}`;
  const category = await CategoryModel.findOne({ name: data.category });
  if (!category) throw BaseError.badRequest("This category not exist");
  const product = await ProductModel.create({
    ...data,
    sku,
    category: category?._id,
  });
  return { product, message: "Product updated successfully." };
};

export const fetchProducts = async (categoryName: string) => {
  const category = await CategoryModel.findOne({ name: categoryName });
  // Filter by category
  const products = await ProductModel.find({ category: category?._id });
  return { products, message: "Product fetched successfully." };
};

export const fetchProduct = async (sku: string) => {
  const product = await ProductModel.findOne({ sku });
  console.log(sku, product);
  if (!product) return { product: null, message: "No Product found." };
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
