import * as express from "express";
import * as validation from "../validations/product.validation";
import * as controllers from "../controllers/product.controller";
import { tryCatch } from "../utils";
import { authenticate } from "../middleware";

const router = express.Router();

// - Admin Authorization will do later

// - Create Product
router.post(
  "/create",
  validation.createProduct,
  tryCatch(controllers.createProduct)
);

// - Delete Product
router.delete(
  "/delete",
  validation.removeProduct,
  tryCatch(controllers.removeProduct)
);

// - Read Product
router.get("/", tryCatch(controllers.fetchProducts));

// // - Update Product
// Will make this later
// router.patch("/update", validation.updateProduct);

export default router;
