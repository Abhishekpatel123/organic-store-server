import { UserModel } from '../database/models';
import { UserInterface, AddressInterface } from '../database/models/UserModel';
import BaseError from '../errors/base-error';
import * as utils from '../utils';

export const otpGenerator = async (email: UserInterface['email']) => {
  const OTP = utils.otpGenerator();
  // - Send OTP through mail
  await utils.sendMail({
    to: email,
    subject: 'Otp Verification mail',
    html: `<h1>OTP is ${OTP}</h1>`
  });

  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    isUser.otp = OTP;
    await isUser.save();
  } else {
    await UserModel.create({ email, otp: OTP });
  }
  return { message: 'Please check your mail for OTP.' };
};

export const otpVerify = async (
  email: UserInterface['email'],
  otp: UserInterface['otp']
) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw BaseError.badRequest(`User not exist.`);
  if (user.otp !== otp) throw BaseError.badRequest('Otp is incorrect.');
  const token = utils.generateToken({ id: user._id, email: user.email });

  // - Add token in DB
  // user.tokens = user.tokens.concat({ token });
  // https://github.com/Automattic/mongoose/issues/7710
  user.set('tokens', user.tokens.concat({ token }));
  await user.save();
  return { user, token, message: 'Successfully !' };
};

interface UpdateUserInterface {
  userId: string;
  data: {
    name?: string;
    phone?: string;
  };
}

export const updateUser = async ({ userId, data }: UpdateUserInterface) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: userId },
    { ...data },
    { new: true }
  );
  return { user, message: 'Successfully !' };
};
