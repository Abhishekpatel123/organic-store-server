import { Schema, model, Document } from "mongoose";
import config from "../../config";

export interface RatingInterface extends Document {
  title: string;
  description: string;
  rateValue: number;
  userName: string;
  userId: string;
  productId: string;
}

const ratingSchema = new Schema<RatingInterface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rateValue: { type: Number, required: true },
    userName: { type: String, default: "Organic Store Customer" },
    productId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const RatingModel = model<RatingInterface>(
  config.mongoConfig.collections.RATINGS,
  ratingSchema
);

export default RatingModel;
