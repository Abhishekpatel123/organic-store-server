import * as express from "express";
import * as controller from "../controllers/auth.controller";
import { authenticate, tryCatch } from "../middleware";

import * as validation from "../validations/auth.validation";

const router = express.Router();

// - OTP Generate
router.post(
  "/otp/generate",
  validation.otpGenerator,
  tryCatch(controller.otpGenerator)
);

// - OTP Verify
router.post(
  "/otp/verify",
  validation.otpVerify,
  tryCatch(controller.otpVerify)
);

// get user details
router.get("/", authenticate, tryCatch(controller.getUser));

// - UPDATE USER
router.patch(
  "/",
  authenticate,
  validation.updateUser,
  tryCatch(controller.updateUser)
);
export default router;
