import { Response, Request } from "express";
import { AddressModel, UserModel } from "../database/models";
import * as services from "../services";

export const otpGenerator = async (req: Request, res: Response) => {
  const { email } = req.body;
  const OTP = services.otpGenerator();
  try {
    // - Send OTP through mail
    await services.sendMail({
      to: email,
      subject: "Otp Verification mail",
      html: `<h1>OTP is ${OTP}</h1>`,
    });

    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      isUser.otp = OTP;
      await isUser.save();
    } else {
      await UserModel.create({ email, otp: OTP });
    }
    return res.status(200).send({ message: "Please check your mail for OTP." });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export const otpVerify = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).send({ message: "User not found." });
    if (user.otp !== otp)
      return res.status(400).send({ message: "Otp is incorrect." });
    const token = services.generateToken({ id: user._id, email: user.email });

    // - Add token in DB
    // user.tokens = user.tokens.concat({ token });
    // https://github.com/Automattic/mongoose/issues/7710
    user.set("tokens", user.tokens.concat({ token }));
    await user.save();
    return res.status(200).json({ user, token, message: "Successfully !" });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  try {
    const address = await AddressModel.create(req.body);
    if (req.user) {
      req.user.addresses.push(address._id);
      await req.user.save();
      return res
        .status(200)
        .send({ message: "Success", user: req.user, address });
    }
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const user = await req.user?.populate("addresses");
    return res.status(200).send({
      message: "Successfully fetched addresses",
      addresses: user?.addresses,
    });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id, ...data } = req.body;
    const address = await AddressModel.findOne({ _id: id });
    if (!address)
      return res.status(404).send({ message: "Address not exist." });
    await AddressModel.updateOne({ _id: id }, data);
    return res.status(200).send({ message: "Successfully Updated Address" });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const address = await AddressModel.findOne({ _id: id });
    if (!address)
      return res.status(404).send({ message: "Address not exist." });

    await AddressModel.findByIdAndDelete(id);
    if (req.user) {
      // 1st way
      // req.user.addresses = req.user.addresses.filter(
      //   (objectId) => objectId !== id
      // );
      // await req.user.save();

      //  2nd way
      await UserModel.updateOne(
        { _id: req.user._id },
        { $pull: { addresses: id } }
      );
      return res.status(200).send({
        message: "Successfully Removed Address",
      });
    }
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
};
