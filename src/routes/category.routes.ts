import * as express from 'express';
import { upload, tryCatch, authenticate } from '../middleware';
import * as categoryValidation from '../validations/category.validation';
import * as categoryControllers from '../controllers/../controllers/category.controller';
import { roles } from '../constants';

const router = express.Router();

// - Add Category
router.post(
  '/',
  authenticate([roles.admin]),
  upload.single('image'),
  categoryValidation.crateCategory,
  tryCatch(categoryControllers.createCategory)
);

// - Update Category
router.patch(
  '/',
  authenticate([roles.admin]),
  upload.single('image'),
  categoryValidation.updateCategory,
  tryCatch(categoryControllers.updateCategory)
);

// - Fetch Categories
router.get('/', tryCatch(categoryControllers.fetchCategories));

// - Delete Category
router.delete(
  '/:id',
  authenticate([roles.admin]),
  tryCatch(categoryControllers.deleteCategory)
);

export default router;
