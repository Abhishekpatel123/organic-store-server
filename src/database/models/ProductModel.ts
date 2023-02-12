import { Schema, model, Document, Types } from 'mongoose';
import config from '../../config';

export interface PricingInterface {
  basePrice: number;
  currency: string;
  discount: number;
}

export interface ProductInterface {
  _id: Schema.Types.ObjectId;
  sku: string;
  name: string;
  title: string;
  description: string;
  avgRating: number;
  ratingCount: number;
  ratingValue: number;
  manufacture_details: any;
  pricing: PricingInterface;
  images: {
    _id: Types.ObjectId;
    imageUrl: string;
    public_id: string;
  }[];
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
      required: true
    },
    manufacture_details: Object,
    pricing: {
      basePrice: Number,
      currency: String,
      discount: Number
    },
    countInStock: { type: Number, required: true },
    images: [
      {
        imageUrl: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ]
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
