import { Schema, model, Document } from 'mongoose';
import config from '../../config';

export interface CategoryInterface extends Document {
  name: string;
  image: string;
}

const categorySchema = new Schema<CategoryInterface>(
  {
    name: { type: String, unique: true, required: true },
    image: {
      imageUrl: { type: String, required: true },
      public_id: { type: String, required: true }
    }
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
