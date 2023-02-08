import * as express from 'express';
import * as validation from '../validations/product.validation';
import * as controllers from '../controllers/product.controller';
import { tryCatch } from '../middleware';

const router = express.Router();

// - Admin Authorization will do later

// - Create Product
router.post('/', validation.createProduct, tryCatch(controllers.createProduct));

// - Delete Product
router.delete(
  '/',
  validation.removeProduct,
  tryCatch(controllers.removeProduct)
);

// - Read Product bu category
router.get('/by-category/:categoryName', tryCatch(controllers.fetchProducts));

// - Get single product by Id
router.get('/by-sku/:sku', tryCatch(controllers.fetchProduct));

// - Top rated product
router.get('/top-rated', tryCatch(controllers.topRatedProduct));

// - Top rated product
router.get('/latest', tryCatch(controllers.latestProduct));

// - Search Product
router.get('/search', tryCatch(controllers.searchProducts));

// // - Update Product
// Will make this later
// router.patch("/update", validation.updateProduct);

export default router;
