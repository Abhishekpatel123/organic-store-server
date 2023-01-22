import { UserModel } from "../database/models";
import * as utils from "../utils";

export const otpGenerator = async (email: string) => {
  const OTP = utils.otpGenerator();
  try {
    // - Send OTP through mail
    await utils.sendMail({
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
    return { message: "Please check your mail for OTP." };
  } catch (err) {
    throw err;
  }
};

export const otpVerify = async (email: string, otp: string) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) throw Error(`{ message: "User not found." }`);
    if (user.otp !== otp) throw Error("Otp is incorrect.");
    const token = utils.generateToken({ id: user._id, email: user.email });

    // - Add token in DB
    // user.tokens = user.tokens.concat({ token });
    // https://github.com/Automattic/mongoose/issues/7710
    user.set("tokens", user.tokens.concat({ token }));
    await user.save();
    return { user, token, message: "Successfully !" };
  } catch (err: any) {
    throw err;
  }
};