import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

export interface WishlistItemInterface {
  itemId: string;
}

export interface WishlistInterface extends Document {
  userId: string;
  items: Types.Array<WishlistItemInterface>;
}

const wishlistSchema = new Schema<WishlistInterface>({
  userId: { type: String, unique: true, required: true },
  items: [
    {
      itemId: {
        type: Types.ObjectId,
        ref: config.mongoConfig.collections.PRODUCTS,
        unique: true,
        required: true,
      },
    },
  ],
});

const WishlistModel = model<WishlistInterface>(
  config.mongoConfig.collections.WISHLISTS,
  wishlistSchema
);

export default WishlistModel;
