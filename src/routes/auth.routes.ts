import * as express from "express";
import * as authController from "../controllers/auth.controller";
import { authenticate } from "../middleware";
import { tryCatch } from "../utils";
import * as authValidation from "../validations/auth.validation";

const router = express.Router();

// - OTP Generate
router.post(
  "/otp/generate",
  authValidation.otpGenerator,
  tryCatch(authController.otpGenerator)
);

// - OTP Verify
router.post(
  "/otp/verify",
  authValidation.otpVerify,
  tryCatch(authController.otpVerify)
);

// - Add Address
router.post(
  "/addresses",
  authenticate,
  authValidation.address,
  tryCatch(authController.addAddress)
);

// - Fetch Address
router.get("/addresses", authenticate, tryCatch(authController.getAddresses));

// - Update Address
router.patch(
  "/addresses",
  authenticate,
  authValidation.updateAddress,
  tryCatch(authController.updateAddress)
);

// - Remove Address
router.delete(
  "/addresses",
  authenticate,
  authValidation.removeAddress,
  tryCatch(authController.deleteAddress)
);

export default router;
