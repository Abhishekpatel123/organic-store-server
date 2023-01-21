import { Schema, model, Document, Types } from "mongoose";
import config from "../../config";

interface TokenInterface {
  token: string;
}

interface UserInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: {};
  otp: string;
  verify: boolean;
  addresses: Types.Array<Types.ObjectId>;
  tokens: Types.Array<TokenInterface>;
}

const userSchema = new Schema<UserInterface>({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true },
  otp: String,
  verify: { type: Boolean, default: false },
  addresses: [
    { type: Types.ObjectId, ref: config.mongoConfig.collections.ADDRESSES },
  ],
  tokens: [{ token: String }],
});

const UserModel = model(config.mongoConfig.collections.USERS, userSchema);
module.exports = UserModel;
