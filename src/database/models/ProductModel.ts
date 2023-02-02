import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

export interface PricingInterface {
  basePrice: number;
  currency: string;
  discount: number;
}

export interface ProductInterface {
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
  countInStock: number;
  category: any;
}

const productSchema = new Schema<ProductInterface & Document>(
  {
    // sku can be multiple will do this later if needed
    // like if the product is book  paperback (sku 837423) and hardcover (sku 83749385)
    // then skus may be [{sku : "", price: {}, countInStock: 100, feature: "hardcover", imageUrl: "", color: ""}]
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    ratingCount: { type: Number, default: 0 },
    ratingValue: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    category: {
      type: Schema.Types.ObjectId,
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
    countInStock: { type: Number, required: true },
    // images: [{ imageUrl: String, color: String }],
    // rating comment will include latter
    // offer will include later version
  },
  { timestamps: true }
);

const ProductModel = model<ProductInterface & Document>(
  config.mongoConfig.collections.PRODUCTS,
  productSchema
);

export default ProductModel;
