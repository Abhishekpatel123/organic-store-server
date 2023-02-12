import { v4 as uuidv4 } from 'uuid';
import { CategoryModel, ProductModel } from '../database/models';
import { ProductInterface } from '../database/models/ProductModel';
import BaseError from '../errors/base-error';
import { ImageType } from '../types';
import { deleteFile, uploadFile } from '../utils/upload-file.utils';

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

export const updateProduct = async (data: ProductInterface) => {
  const { _id, ...rest } = data;
  const isCategory = await CategoryModel.findOne({ _id: rest.category });
  if (!isCategory) throw BaseError.badRequest('This category not exist');
  const product = await ProductModel.findByIdAndUpdate(
    _id,
    { ...rest },
    { new: true }
  );
  if (!product) throw BaseError.badRequest('Product not found.');

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
    images.map((image) => uploadFile(image.path, `product-${uuidv4()}`))
  );
  const product = await ProductModel.findByIdAndUpdate(productId, {
    $push: { images: { $each: responses } }
  });
  if (!product) throw BaseError.badRequest('Product not found.');

  return { message: 'Successfully saved the images.' };
};

// export const updateProductImages = async ({
//   productId,
//   images
// }: {
//   productId: string;
//   images: ImageType[];
// }) => {
//   const responses = await Promise.all(
//     images.map((image) => utils.uploadFile(image.path, `product-${uuidv4()}`))
//   );
//   console.log(responses, 'response');
//   const product = await ProductModel.findByIdAndUpdate(productId, {
//     $push: { images: { $each: responses } }
//   });
//   if (!product) throw BaseError.badRequest('Product not found.');

//   return { message: 'Successfully updated the images.' };
// };

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
  // non blocking while deleting images form cloud
  Promise.all(product.images.map((image) => deleteFile(image.public_id)));
  await ProductModel.findByIdAndDelete(id);
  return { message: 'Product removed successfully.' };
};

export const deleteProductImage = async ({
  productId,
  imageId
}: {
  productId: ProductInterface['_id'];
  imageId: string;
}) => {
  const product = await ProductModel.findOne({ _id: productId });
  if (!product) throw BaseError.badRequest('Product not exist.');
  const image = product.images.find(
    (image) => image._id.toString() === imageId.toString()
  );
  if (!image) throw BaseError.badRequest('Image not found.');
  deleteFile(image?.public_id);
  const leftImages = product.images.filter(
    (image) => image._id.toString() !== imageId.toString()
  );
  product.images = leftImages;
  await product.save();
  return { message: 'Image removed successfully.' };
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
