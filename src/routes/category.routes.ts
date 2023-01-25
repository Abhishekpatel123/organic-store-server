import * as express from "express";
import { upload, tryCatch } from "../middleware";
import * as categoryValidation from "../validations/category.validation";
import * as categoryControllers from "../controllers/../controllers/category.controller";

const router = express.Router();

// - Add Category
router.post(
  "/create",
  upload.single("image"),
  categoryValidation.crateCategory,
  tryCatch(categoryControllers.createCategory)
);

// - Fetch Categories
router.get("/get", tryCatch(categoryControllers.fetchCategories));

// - Delete Category
router.delete(
  "/delete",
  categoryValidation.removeCategory,
  tryCatch(categoryControllers.removeCategory)
);

export default router;
