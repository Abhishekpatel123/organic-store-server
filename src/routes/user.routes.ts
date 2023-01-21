import * as express from "express";
import * as authController from "../controllers/authController";
import { authenticate } from "../middleware";
import * as authValidation from "../validations/auth.validation";

const router = express.Router();

// - OTP Generate
router.post(
  "/otp/generate",
  authValidation.otpGenerator,
  authController.otpGenerator
);

// - OTP Verify
router.post("/otp/verify", authValidation.otpVerify, authController.otpVerify);

// - Add Address
router.post(
  "/addresses",
  authenticate,
  authValidation.address,
  authController.addAddress
);

// - Fetch Address
router.get("/addresses", authenticate, authController.getAddresses);

// - Update Address
router.patch(
  "/addresses",
  authenticate,
  authValidation.updateAddress,
  authController.updateAddress
);

// - Remove Address
router.delete(
  "/addresses",
  authenticate,
  authValidation.removeAddress,
  authController.deleteAddress
);

//

export default router;
