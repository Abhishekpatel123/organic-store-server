import * as express from "express";
import * as validation from "../validations/wishlist.validation";
import * as controllers from "../controllers/wishlist.controller";

import { authenticate, tryCatch } from "../middleware";

const router = express.Router();

// - Get Wishlist details
router.get("/", authenticate, tryCatch(controllers.fetchWishlist));

// - Add product or item into Wishlist
router.post(
  "/add",
  authenticate,
  validation.addItemIntoWishlist,
  tryCatch(controllers.addItemIntoWishlist)
);

// - Remove item from Wishlist
router.delete(
  "/delete",
  authenticate,
  validation.removeWishlistItem,
  tryCatch(controllers.removeWishlistItem)
);

export default router;
