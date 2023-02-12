import * as express from 'express';
import { roles } from '../constants';
import * as controller from '../controllers/address.controller';
import { authenticate, tryCatch } from '../middleware';

import * as validation from '../validations/address.validation';

const router = express.Router();

// - Add Address
router.post(
  '/',
  authenticate([roles.customer, roles.admin]),
  validation.address,
  tryCatch(controller.addAddress)
);

// - Make This Address to Shipping Address
router.post(
  '/shipping/:addressId',
  authenticate([roles.customer, roles.admin]),
  tryCatch(controller.makeShippingAddress)
);

// - Fetch Address
router.get(
  '/',
  authenticate([roles.customer, roles.admin]),
  tryCatch(controller.getAddresses)
);

// - Update Address
router.patch(
  '/',
  authenticate([roles.customer, roles.admin]),
  validation.updateAddress,
  tryCatch(controller.updateAddress)
);

// - Remove Address
router.delete(
  '/:id',
  authenticate([roles.customer, roles.admin]),
  tryCatch(controller.deleteAddress)
);

export default router;
