import * as express from "express";
import * as controller from "../controllers/address.controller";
import { authenticate, tryCatch } from "../middleware";

import * as validation from "../validations/address.validation";

const router = express.Router();

// - Add Address
router.post(
  "/",
  authenticate,
  validation.address,
  tryCatch(controller.addAddress)
);

// - Make This Address to Shipping Address
router.post(
  "/shipping/:addressId",
  authenticate,
  tryCatch(controller.makeShippingAddress)
);

// - Fetch Address
router.get("/", authenticate, tryCatch(controller.getAddresses));

// - Update Address
router.patch(
  "/",
  authenticate,
  validation.updateAddress,
  tryCatch(controller.updateAddress)
);

// - Remove Address
router.delete(
  "/",
  authenticate,
  validation.removeAddress,
  tryCatch(controller.deleteAddress)
);

export default router;
