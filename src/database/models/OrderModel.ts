// will not store reference of product in order model will store whole data
// of product because it future product may be deleted if your will have reference then how he or she can
// see the product details that's why order should be static not be dynamic
// shipping address and billing address of the user will store static

import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";
import { PricingInterface, ProductInterface } from "./ProductModel";

export interface OrderInterface {
  userId: string;
  customerId: string;
  paymentIntentId: string;
  paymentStatus: string;
  status: string;
  bill: number;
  paymentType: string;
  items: Types.Array<OrderItemInterface>;
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

export interface OrderItemInterface {
  // item: {
  sku: string;
  name: string;
  title: string;
  description: string;
  avgRating: number;
  ratingCount: number;
  ratingValue: number;
  manufacture_details: any;
  pricing: PricingInterface;
  imageUrl: string;
  category: any;
  // };
  quantity: number;
}

const orderSchema = new Schema<OrderInterface>({
  userId: { type: String, required: true },
  customerId: String,
  paymentIntentId: String,
  paymentStatus: { type: String, required: true },
  status: { type: String, required: true },
  bill: { type: Number, required: true },
  paymentType: { type: String, required: true },
  items: [
    {
      // item: {
      // - sku not unique here because same sku product can user buy more time
      sku: { type: String, required: true },
      name: { type: String, required: true },
      title: { type: String, required: true },
      description: String,
      rating: Number,
      category: {
        type: Types.ObjectId,
        ref: config.mongoConfig.collections.CATEGORIES,
        required: true,
      },
      manufacture_details: Object,
      pricing: {
        basePrice: Number,
        currency: String,
        discount: Number,
      },
      imageUrl: String,
      // },
      quantity: { type: Number, required: true },
    },
  ],
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

const OrderModel = model<OrderInterface & Document>(
  config.mongoConfig.collections.ORDERS,
  orderSchema
);

export default OrderModel;
