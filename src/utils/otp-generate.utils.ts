import { generate } from "otp-generator";

import constants from "../constants";

const otpGenerator = () => {
  const OTP = generate(constants.OTP_LENGTH, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};

export default otpGenerator;
