import * as express from 'express';
import { upload, tryCatch, authenticate } from '../middleware';
import * as categoryValidation from '../validations/category.validation';
import * as categoryControllers from '../controllers/../controllers/category.controller';
import { roles } from '../constants';

const router = express.Router();

// - Add Category
router.post(
  '/create',
  authenticate([roles.admin]),
  upload.single('image'),
  categoryValidation.crateCategory,
  tryCatch(categoryControllers.createCategory)
);

// - Fetch Categories
router.get('/get', tryCatch(categoryControllers.fetchCategories));

// - Delete Category
router.delete(
  '/delete',
  authenticate([roles.admin]),
  categoryValidation.removeCategory,
  tryCatch(categoryControllers.removeCategory)
);

export default router;
