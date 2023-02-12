import { Schema, model, Document } from 'mongoose';
import config from '../../config';

export interface CategoryInterface extends Document {
  name: string;
  imageUrl: string;
}

const categorySchema = new Schema<CategoryInterface>(
  {
    name: { type: String, unique: true, required: true },
    imageUrl: String
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

const CategoryModel = model(
  config.mongoConfig.collections.CATEGORIES,
  categorySchema
);

export default CategoryModel;
