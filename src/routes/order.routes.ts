import * as express from 'express';
import { authenticate, tryCatch } from '../middleware';
import * as controllers from '../controllers/order.controller';
import { roles } from '../constants';

const router = express.Router();

// - Get orders
router.get(
  '/',
  authenticate([roles.customer]),
  tryCatch(controllers.fetchOrders)
);

// - Get single order
router.get(
  '/:orderId',
  authenticate([roles.customer]),
  tryCatch(controllers.fetchOrder)
);

// - Get total order count

// - Get total sales

// Checkout
router.post(
  '/checkout',
  authenticate([roles.customer]),
  tryCatch(controllers.createOrder)
);

// Cash on delivery
router.post(
  '/cod',
  authenticate([roles.customer]),
  tryCatch(controllers.codOrder)
);

// No option for update and delete

export default router;
