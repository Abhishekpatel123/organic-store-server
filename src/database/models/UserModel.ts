import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

interface TokenInterface {
  token: string;
}

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  otp: string;
  verify: boolean;
  addresses: Types.Array<{
    address: Types.ObjectId;
    isShippingAddress: boolean;
  }>;
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
      address: {
        type: Types.ObjectId,
        ref: config.mongoConfig.collections.ADDRESSES,
      },
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
