import * as express from "express";
import * as validation from "../validations/cart.validation";
import * as controllers from "../controllers/cart.controller";

import { authenticate, tryCatch } from "../middleware";

const router = express.Router();

// - Get cart details
router.get("/", authenticate, tryCatch(controllers.fetchCart));

// - Add product or item into cart
router.post(
  "/add",
  authenticate,
  validation.addItemIntoCart,
  tryCatch(controllers.addItemIntoCart)
);

// - Remove item from cart
router.delete(
  "/delete",
  authenticate,
  validation.removeCartItem,
  tryCatch(controllers.removeCartItem)
);

export default router;
