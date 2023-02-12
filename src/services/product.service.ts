import { v4 as uuidv4 } from 'uuid';
import { CategoryModel, ProductModel } from '../database/models';
import { ProductInterface } from '../database/models/ProductModel';
import BaseError from '../errors/base-error';
import { ImageType } from '../types';
import * as utils from '../utils';

export const createProduct = async (data: ProductInterface) => {
  const sku = `${data.category}-${uuidv4()}`;
  const category = await CategoryModel.findOne({ name: data.category });
  if (!category) throw BaseError.badRequest('This category not exist');
  const product = await ProductModel.create({
    ...data,
    sku,
    category: category?._id
  });
  return { product, message: 'Product updated successfully.' };
};

export const uploadProductImages = async ({
  productId,
  images
}: {
  productId: string;
  images: ImageType[];
}) => {
  const responses = await Promise.all(
    images.map((image) => utils.uploadFile(image.path, `product-${uuidv4()}`))
  );
  await ProductModel.findByIdAndUpdate(productId, {
    $set: { images: responses }
  });
  return { message: 'Successfully saved the images.' };
};

export const fetchProducts = async (categoryName: string) => {
  const category = await CategoryModel.findOne({ name: categoryName });
  // Filter by category
  const products = await ProductModel.find({ category: category?._id });
  return { products, message: 'Product fetched successfully.' };
};

export const fetchProduct = async (sku: string) => {
  const product = await ProductModel.findOne({ sku });
  console.log(sku, product);
  if (!product) return { product: null, message: 'No Product found.' };
  return { product, message: 'Product fetched successfully.' };
};

export const topRatedProduct = async ({ limit = 10 }: { limit?: number }) => {
  const product = await ProductModel.find({})
    .sort({ avgRating: -1 })
    .limit(limit);
  if (!product) return { product: null, message: 'No product found.' };
  return { product, message: 'Product fetched successfully.' };
};

export const latestProduct = async ({ limit = 10 }: { limit?: number }) => {
  const product = await ProductModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit);
  if (!product) return { product: null, message: 'No product found.' };
  return { product, message: 'Product fetched successfully.' };
};

export const removeProduct = async (id: ProductInterface['_id']) => {
  const product = await ProductModel.findOne({ _id: id });
  if (!product) throw BaseError.badRequest('Product not exist.');

  await ProductModel.findByIdAndDelete(id);
  return { message: 'Product removed successfully.' };
};

export const searchProducts = async (keyword: string) => {
  const products = await ProductModel.find({
    $or: [
      { name: { $regex: keyword.trim() } },
      { title: { $regex: keyword.trim() } },
      { description: { $regex: keyword.trim() } }
    ]
  })
    .populate('category')
    .select('title images sku category');
  if (!products) throw BaseError.badRequest('Product not exist.');

  return { message: 'Products searched successfully.', products };
};
