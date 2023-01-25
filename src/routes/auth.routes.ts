import * as express from "express";
import * as authController from "../controllers/auth.controller";
import { authenticate, tryCatch } from "../middleware";

import * as validation from "../validations/auth.validation";

const router = express.Router();

// - OTP Generate
router.post(
  "/otp/generate",
  validation.otpGenerator,
  tryCatch(authController.otpGenerator)
);

// - OTP Verify
router.post(
  "/otp/verify",
  validation.otpVerify,
  tryCatch(authController.otpVerify)
);

// - Add Address
router.post(
  "/addresses",
  authenticate,
  validation.address,
  tryCatch(authController.addAddress)
);

// - Make This Address to Shipping Address
router.post(
  "/addresses/shipping/:addressId",
  authenticate,
  validation.makeShippingAddress,
  tryCatch(authController.makeShippingAddress)
);


// - Fetch Address
router.get("/addresses", authenticate, tryCatch(authController.getAddresses));

// - Update Address
router.patch(
  "/addresses",
  authenticate,
  validation.updateAddress,
  tryCatch(authController.updateAddress)
);

// - Remove Address
router.delete(
  "/addresses",
  authenticate,
  validation.removeAddress,
  tryCatch(authController.deleteAddress)
);

export default router;
