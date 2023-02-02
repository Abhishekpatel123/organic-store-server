import { Schema } from "mongoose";
import ProductModel, { ProductInterface } from "../models/ProductModel";

export type OptionType = {
  limit?: number;
  skip?: number;
};

const ProductRepository = {
  create: async (data: ProductInterface) => {
    const doc = await ProductModel.create(data);
    return doc;
  },

  find: async (data: ProductInterface, options: OptionType) => {
    const { limit, skip } = options;
    const doc = await ProductModel.find(data).limit;
    return doc;
  },

  findOne: async (data: ProductInterface) => {
    const doc = await ProductModel.findOne(data);
    return doc;
  },
};

export default ProductRepository;
