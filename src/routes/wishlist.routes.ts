import * as express from 'express';
import * as validation from '../validations/wishlist.validation';
import * as controllers from '../controllers/wishlist.controller';

import { authenticate, tryCatch } from '../middleware';
import { roles } from '../constants';

const router = express.Router();

// - Get Wishlist details
router.get(
  '/',
  authenticate([roles.customer]),
  tryCatch(controllers.fetchWishlist)
);

// - Add product or item into Wishlist
router.post(
  '/add',
  authenticate([roles.customer]),
  validation.addItemIntoWishlist,
  tryCatch(controllers.addItemIntoWishlist)
);

// - Remove item from Wishlist
router.delete(
  '/:id',
  authenticate([roles.customer]),
  tryCatch(controllers.deleteWishlistItem)
);

export default router;
