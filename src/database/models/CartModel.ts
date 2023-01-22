import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";
import { ProductInterface } from "./ProductModel";

export interface CartInterface extends Document {
  userId: string;
  items: Types.Array<ProductInterface>;
  billing: {
    totalPrice: number;
    currency: string;
  };
  // 1 item may have more then 1 add
  quantity: number;
}

const cartSchema = new Schema<CartInterface>({
  userId: { type: String, unique: true, required: true },
  items: {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    rating: Number,
    category: { type: String, required: true },
    manufacture_details: Object,
    pricing: {
      basePrice: Number,
      currency: String,
      discount: Number,
    },
    imageUrl: String,
    quantity: { type: Number, required: true },
  },
  billing: {
    totalPrice: { type: Number, required: true, default: 0 },
    currency: { type: String, required: true, default: "USD" },
  },
  quantity: { type: Number, required: true, default: 0 },
});

const CartModel = model<CartInterface>(
  config.mongoConfig.collections.CARTS,
  cartSchema
);

export default CartModel;
