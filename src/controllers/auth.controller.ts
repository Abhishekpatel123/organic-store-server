import { Response, Request } from "express";
import { AddressModel, UserModel } from "../database/models";
import * as services from "../services/auth.service";
import { v4 as uuidv4 } from "uuid";

export const otpGenerator = async (req: Request, res: Response) => {
  const { email } = req.body;
  const data = await services.otpGenerator(email);
  res.status(200).send(data);
};

export const otpVerify = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const data = await services.otpVerify(email, otp);
  res.status(200).json(data);
};

export const addAddress = async (req: Request, res: Response) => {
  // const address = await AddressModel.create(req.body);
  const { addresses = [] } = req.user;
  const addressId = uuidv4();
  const isShippingAddress = addresses.length === 0;
  req.user.addresses.push({
    ...req.body,
    addressId,
    isShippingAddress,
  });
  await req.user.save();
  return res
    .status(200)
    .send({ message: "Success", addresses: req.user.addresses });
};

export const getAddresses = async (req: Request, res: Response) => {
  const user = await req.user?.populate("addresses");
  return res.status(200).send({
    message: "Successfully fetched addresses",
    addresses: user?.addresses,
  });
};

export const updateAddress = async (req: Request, res: Response) => {
  const { addressId, ...data } = req.body;
  // const address = await AddressModel.findOne({ _id: id });
  // if (!address) return res.status(404).send({ message: "Address not exist." });
  await UserModel.updateOne(
    { _id: req.user._id, "addresses.addressId": addressId },
    { $set: { "addresses.$": data } }
  );
  return res.status(200).send({ message: "Successfully Updated Address" });
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { addressId } = req.body;
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
    { $pull: { addresses: { addressId } } }
  );
  return res.status(200).send({
    message: "Successfully Removed Address",
  });
};

// make this address to shipping address
export const makeShippingAddress = async (req: Request, res: Response) => {
  // const user = req.user;
  const addressId = req.params.addressId;
  const response = await services.makeShippingAddress(req, addressId);
  return res.status(200).send(response);
};
