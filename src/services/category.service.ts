import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from '../database/models';
import { CategoryInterface } from '../database/models/CategoryModel';
import BaseError from '../errors/base-error';
import { ImageType } from '../types';
import { deleteFile, uploadFile } from '../utils/upload-file.utils';

export const createCategory = async ({
  name,
  file
}: {
  name: CategoryInterface['name'];
  file: ImageType;
}) => {
  const isAlreadyExist = await CategoryModel.findOne({ name });
  if (isAlreadyExist) {
    throw BaseError.badRequest('Same name category already exists');
  }
  const fileUrl = await uploadFile(file.path, `category-${uuidv4()}`);
  const category = await CategoryModel.create({
    name,
    image: fileUrl
  });
  return { category, message: 'Category created successfully.' };
};

export const updateCategory = async ({
  data,
  file
}: {
  data: {
    name?: CategoryInterface['name'];
    categoryId: CategoryInterface['_id'];
  };
  file?: ImageType;
}) => {
  let updateData = JSON.parse(JSON.stringify(data));

  if (file) {
    updateData.image = (await uploadFile(
      file.path,
      `category-${uuidv4()}`
    )) as {
      imageUrl: string;
      public_id: string;
    };
  }

  const category = await CategoryModel.findByIdAndUpdate(
    data.categoryId,
    updateData,
    { new: true }
  );
  if (!category) throw BaseError.badRequest('Product not found.');

  return { category, message: 'Category updated successfully.' };
};

export const fetchCategories = async () => {
  const categories = await CategoryModel.find({});
  return { categories, message: 'Categories fetched successfully.' };
};

export const deleteCategory = async (id: CategoryInterface['_id']) => {
  const category = await CategoryModel.findOne({ _id: id });
  if (!category) throw BaseError.badRequest('Category not exist.');
  deleteFile(category.image.public_id);
  await CategoryModel.findByIdAndDelete(id);
  return { message: 'Categories removed successfully.' };
};
