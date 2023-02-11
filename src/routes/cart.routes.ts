import * as express from 'express';
import * as validation from '../validations/cart.validation';
import * as controllers from '../controllers/cart.controller';

import { authenticate, tryCatch } from '../middleware';
import { roles } from '../constants';

const router = express.Router();

// - Get cart details
router.get(
  '/',
  authenticate([roles.customer]),
  tryCatch(controllers.fetchCart)
);

// - billing
router.get(
  '/bill',
  authenticate([roles.customer]),
  tryCatch(controllers.getBilling)
);

// - Add product or item into cart
router.post(
  '/items',
  authenticate([roles.customer]),
  validation.addItemIntoCart,
  tryCatch(controllers.addItemIntoCart)
);

// - Remove item from cart
router.delete(
  '/items',
  authenticate([roles.customer]),
  validation.removeCartItem,
  tryCatch(controllers.removeCartItem)
);

// - FETCH ITEM BY ITEM ID
router.get(
  '/items/:itemId',
  authenticate([roles.customer]),
  tryCatch(controllers.fetchItem)
);

export default router;
