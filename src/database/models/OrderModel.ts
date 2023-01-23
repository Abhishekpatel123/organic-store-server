// will not store reference of product in order model will store whole data
// of product because it future product may be deleted if your will have reference then how he or she can
// see the product details that's why order should be static not be dynamic
// shipping address and billing address of the user will store static

import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";
import { ProductInterface } from "./ProductModel";

export interface ORDERInterface extends Document {
  userId: string;
  paymentStatus: string;
  status: string;
  billing: {
    price: number;
    currency: string;
  };
  items: Types.Array<ProductInterface>;
  shippingAddress: {
    name: string;
    phone: string;
    pinCode: number;
    locality: string;
    areaAndStreet: string;
    city: string;
    state: string;
    landmark: string;
    alternativePhone: string;
    addressType: "Home" | "Work";
  };
}

const orderSchema = new Schema<ORDERInterface>({
  userId: { type: String, unique: true, required: true },
  paymentStatus: { type: String, required: true },
  status: { type: String, required: true },
  billing: {
    price: { type: Number, required: true },
    currency: { type: String, required: true },
  },
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
    countInStock: { type: Number, required: true },
  },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pinCode: { type: Number, required: true },
    locality: { type: String, required: true },
    areaAndStreet: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    // optional
    landmark: String,
    alternativePhone: String,
    addressType: { type: String, required: true },
  },
});

const OrderModel = model<ORDERInterface>(
  config.mongoConfig.collections.ORDERS,
  orderSchema
);

export default OrderModel;
