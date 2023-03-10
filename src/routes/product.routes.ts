import * as express from 'express';
import * as validation from '../validations/product.validation';
import * as controllers from '../controllers/product.controller';
import { authenticate, tryCatch, upload } from '../middleware';
import { roles } from '../constants';

const router = express.Router();

// - Create Product
router.post(
  '/',
  authenticate([roles.admin, roles.seller]),
  validation.createProduct,
  tryCatch(controllers.createProduct)
);

// - Upload Product Image
router.post(
  '/images',
  authenticate([roles.admin, roles.seller]),
  upload.array('images', 4),
  validation.uploadProductImages,
  tryCatch(controllers.uploadProductImages)
);

// - Update Product
router.patch(
  '/',
  authenticate([roles.admin, roles.seller]),
  validation.updateProduct,
  tryCatch(controllers.updateProduct)
);

// - Update Product Images
// router.patch(
//   '/images',
//   authenticate([roles.admin, roles.seller]),
//   upload.array('images', 4),
//   validation.uploadProductImages,
//   tryCatch(controllers.updateProductImages)
// );

// - Delete Product
router.delete(
  '/:id',
  authenticate([roles.admin, roles.seller]),
  tryCatch(controllers.deleteProduct)
);

// - Delete Product Image
router.delete(
  '/images',
  authenticate([roles.admin, roles.seller]),
  validation.deleteProductImage,
  tryCatch(controllers.deleteProductImage)
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
