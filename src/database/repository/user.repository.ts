import BaseError from "../../errors/base-error";
import { UserModel } from "../models";

interface CrateUserInterface {
  email: string;
  phone?: string;
  otp?: string;
}

interface FilterInterface {
  _id?: string;
  email?: string;
}

interface UpdateInterface {
  otp: string;
}

const userRepository = {
  findOne: async (query: FilterInterface) => {
    try {
      const user = await UserModel.findOne(query);
      return user;
    } catch (err: any) {
      throw BaseError.internalServer(err.message);
    }
  },
  create: async (data: CrateUserInterface) => {
    try {
      const user = await UserModel.create(data);
      return user;
    } catch (err: any) {
      throw BaseError.internalServer(err.message);
    }
  },

  updateOne: async (query: FilterInterface, update: UpdateInterface) => {
    try {
      const user = await UserModel.updateOne(query, update);
      return user;
    } catch (err: any) {
      throw BaseError.internalServer(err.message);
    }
  },
};

export default userRepository;
