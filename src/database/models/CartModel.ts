import { Schema, model, Document, Types } from 'mongoose';
import config from '../../config';
import { ProductInterface } from './ProductModel';

export interface CartItemInterface {
  itemId: Types.ObjectId;
  basePrice: number;
  quantity: number;
}

export interface ExtendedCartItemInterface {
  quantity: number;
  itemId: ProductInterface;
  basePrice: number;
}

export interface CartInterface extends Document {
  userId: string;
  items: Types.Array<CartItemInterface>;
  bill: number;
}

const cartSchema = new Schema<CartInterface>({
  userId: { type: String, unique: true, required: true },
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: config.mongoConfig.collections.PRODUCTS,
        required: true
      },
      // same price which is of product
      basePrice: { type: Number, required: true },
      // no of product of same
      quantity: { type: Number, required: true }
    }
  ],
  bill: { type: Number, required: true, default: 0 }
});

const CartModel = model<CartInterface>(
  config.mongoConfig.collections.CARTS,
  cartSchema
);

export default CartModel;
