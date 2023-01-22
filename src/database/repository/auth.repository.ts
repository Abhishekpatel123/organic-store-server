import ErrorHandler from "../../Error";
import { UserModel } from "../models";

interface CrateUserInterface {
  email: string;
  phone?: string;
  otp?: string;
}

interface QueryInterface {
  _id?: string;
  email?: string;
}

interface UpdateInterface {
  otp: string;
}

const authRepository = {
  FindUser: async (query: QueryInterface) => {
    try {
      const user = await UserModel.findOne(query);
      return user;
    } catch (err: any) {
      throw ErrorHandler.BadRequest(err.message);
    }
  },
  CreateUser: async (data: CrateUserInterface) => {
    try {
      const user = await UserModel.create(data);
      return user;
    } catch (err: any) {
      throw ErrorHandler.BadRequest(err.message);
    }
  },

  UpdateUser: async (query: QueryInterface, update: UpdateInterface) => {
    try {
      const user = await UserModel.updateOne(query, update);
      return user;
    } catch (err: any) {
      throw ErrorHandler.BadRequest(err.message);
    }
  },
};

export default authRepository;
