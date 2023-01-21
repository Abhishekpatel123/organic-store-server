import * as express from "express";
import { upload } from "../middleware";
import * as categoryValidation from "../validations/category.validation";
import * as categoryControllers from "../controllers/../controllers/category.controller";

const router = express.Router();

// - Add Category
router.post(
  "/create",
  upload.single("image"),
  categoryValidation.crateCategory,
  categoryControllers.createCategory
);

// - Fetch Categories
router.get("/get", categoryControllers.fetchCategories);

// - Delete Category
router.delete(
  "/delete",
  categoryValidation.removeCategory,
  categoryControllers.removeCategory
);

export default router;
