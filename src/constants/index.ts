import { httpStatusCodes } from "./response.constant";

const status = {
  pending: "PENDING",
  success: "SUCCESS",
  failed: "FAILED",
};

export default {
  OTP_LENGTH: 6,
  httpStatusCodes,
  currencies: {
    RUPEE: "INR",
    DOLLAR: "USD",
  },
  status,
};
