import * as express from "express";
import * as validation from "../validations/product.validation";
import * as controllers from "../controllers/product.controller";
import { tryCatch } from "../utils";

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

// - Read Product bu category
router.get("/by-category/:categoryId", tryCatch(controllers.fetchProducts));

// - Get single product by Id
router.get("/id/:productId", tryCatch(controllers.fetchProduct));

// - Top rated product 
router.get("/top-rated", tryCatch(controllers.topRatedProduct));

// - Top rated product 
router.get("/latest", tryCatch(controllers.latestProduct));

// // - Update Product
// Will make this later
// router.patch("/update", validation.updateProduct);

export default router;
