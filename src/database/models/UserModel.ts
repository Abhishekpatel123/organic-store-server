import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

interface TokenInterface {
  token: string;
}

export interface AddressInterface {
  addressId: string;
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
  isShippingAddress: boolean;
}

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  otp: string;
  verify: boolean;
  addresses: Types.Array<AddressInterface>;
  tokens: Types.Array<TokenInterface>;
}

const userSchema = new Schema<UserInterface>({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true },
  otp: String,
  verify: { type: Boolean, default: false },
  addresses: [
    {
      addressId: { type: String, unique: true, required: true },
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
      isShippingAddress: { type: Boolean, default: false },
    },
  ],
  tokens: [{ token: String }],
});

const UserModel = model<UserInterface>(
  config.mongoConfig.collections.USERS,
  userSchema
);

export default UserModel;
