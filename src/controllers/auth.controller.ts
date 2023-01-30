import { Response, Request } from "express";
import { AddressModel, UserModel } from "../database/models";
import * as services from "../services/auth.service";
import { v4 as uuidv4 } from "uuid";
import { httpStatusCodes } from "../constants/response.constant";

export const otpGenerator = async (req: Request, res: Response) => {
  const { email } = req.body;
  const data = await services.otpGenerator(email);
  res.status(httpStatusCodes.CREATED).send(data);
};

export const otpVerify = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const data = await services.otpVerify(email, otp);
  res.status(httpStatusCodes.OK).json(data);
};

export const getUser = (req: Request, res: Response) => {
  const data = req.user;
  res.status(httpStatusCodes.OK).json({ user: data });
};

export const addAddress = async (req: Request, res: Response) => {
  // const address = await AddressModel.create(req.body);
  const { addresses = [] } = req.user;
  const isShippingAddress = addresses.length === 0;
  const address = {
    ...req.body,
    isShippingAddress,
  };
  console.log(address, "ad");
  req.user.addresses.push(address);
  const user = await req.user.save();
  console.log(user, "user");
  return res
    .status(httpStatusCodes.CREATED)
    .send({ message: "Success", addresses: req.user.addresses });
};

export const getAddresses = async (req: Request, res: Response) => {
  return res.status(httpStatusCodes.OK).send({
    message: "Successfully fetched addresses",
    addresses: req.user?.addresses,
  });
};

export const updateAddress = async (req: Request, res: Response) => {
  const { _id, ...data } = req.body;
  // const address = await AddressModel.findOne({ _id: id });
  // if (!address) return res.status(404).send({ message: "Address not exist." });
  const user = await UserModel.updateOne(
    { _id: req.user._id, "addresses._id": _id },
    { $set: { "addresses.$": data } },
    { new: true }
  );
  return res
    .status(httpStatusCodes.OK)
    .send({ message: "Successfully Updated Address", addresses: user });
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { _id } = req.body;
  // const address = await AddressModel.findOne({ _id: id });
  // if (!address) return res.status(404).send({ message: "Address not exist." });

  // await AddressModel.findByIdAndDelete(id);
  // 1st way
  // req.user.addresses = req.user.addresses.filter(
  //   (objectId) => objectId !== id
  // );
  // await req.user.save();

  //  2nd way
  await UserModel.updateOne(
    { _id: req.user._id },
    { $pull: { addresses: { _id } } }
  );
  return res.status(httpStatusCodes.OK).send({
    message: "Successfully Removed Address",
  });
};

// make this address to shipping address
export const makeShippingAddress = async (req: Request, res: Response) => {
  // const user = req.user;
  const addressId = req.params.addressId;
  const response = await services.makeShippingAddress(req, addressId);
  return res.status(httpStatusCodes.OK).send(response);
};
