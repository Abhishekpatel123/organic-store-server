import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

interface AddressInterface extends Document {
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
}

const addressSchema = new Schema<AddressInterface>({
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
});

const AddressModel = model(
  config.mongoConfig.collections.ADDRESSES,
  addressSchema
);
module.exports = AddressModel;
