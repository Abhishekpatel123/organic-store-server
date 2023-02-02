import { httpStatusCodes } from "./response.constant";

const status = {
  pending: "PENDING",
  success: "SUCCESS",
  failed: "FAILED",
};

const paymentType = {
  cod: "Cash On Delivery",
  online: "Online",
};

export default {
  OTP_LENGTH: 6,
  httpStatusCodes,
  minForFreeDelivery: 1000,
  deliveryCharges: 40,
  deliveryFree: "FREE",
  currencies: {
    RUPEE: "INR",
    DOLLAR: "USD",
  },
  status,
  paymentType,
};
