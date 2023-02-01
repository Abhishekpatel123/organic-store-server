import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

interface TokenInterface {
  token: string;
}

export interface AddressInterface {
  _id: Types.ObjectId;
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
  // isShippingAddress: boolean;
}

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  otp: string;
  verify: boolean;
  addresses: Types.Array<AddressInterface>;
  shippingAddressId: string;
  tokens: Types.Array<TokenInterface>;
}

const userSchema = new Schema<UserInterface>(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true },
    otp: String,
    verify: { type: Boolean, default: false },
    addresses: [
      {
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
        // isShippingAddress: { type: Boolean, default: false },
      },
    ],
    shippingAddressId: String,
    tokens: [{ token: String }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.tokens;
        delete ret.__v;
        delete ret.otp;
        return ret;
      },
    },
  }
);

const UserModel = model<UserInterface>(
  config.mongoConfig.collections.USERS,
  userSchema
);

export default UserModel;
