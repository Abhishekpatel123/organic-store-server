import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

interface ImageInterface {
  imageUrl: string;
  color: string;
}

interface PricingInterface {
  basePrice: number;
  currency: string;
  discount: number;
}

export interface ProductInterface extends Document {
  sku: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  manufacture_details: any;
  pricing: PricingInterface;
  imageUrl: string;
  quantity: number;
  category: string;
}

const productSchema = new Schema<ProductInterface>({
  // sku can be multiple will do this later if needed
  // like if the product is book  paperback (sku 837423) and hardcover (sku 83749385)
  // then skus may be [{sku : "", price: 233, quantity: 100, feature: "hardcover", imageUrl: "", color: ""}]
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  rating: Number,
  manufacture_details: Object,
  pricing: {
    basePrice: Number,
    currency: String,
    discount: Number,
  },
  // images: [{ imageUrl: String, color: String }],
  imageUrl: String,
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  // rating comment will include latter
  // offer will include later version
});

const ProductModel = model<ProductInterface>(
  config.mongoConfig.collections.PRODUCTS,
  productSchema
);

export default ProductModel;
