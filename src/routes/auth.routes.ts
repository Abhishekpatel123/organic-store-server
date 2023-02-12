import * as express from 'express';
import { roles } from '../constants';
import * as controller from '../controllers/auth.controller';
import { authenticate, tryCatch } from '../middleware';

import * as validation from '../validations/auth.validation';

const router = express.Router();

// - OTP Generate
router.post(
  '/otp/generate',
  validation.otpGenerator,
  tryCatch(controller.otpGenerator)
);

// - OTP Verify
router.post(
  '/otp/verify',
  validation.otpVerify,
  tryCatch(controller.otpVerify)
);

// get user details
router.get(
  '/',
  authenticate([roles.customer, roles.admin, roles.seller]),
  tryCatch(controller.getUser)
);

// - UPDATE USER
router.patch(
  '/',
  authenticate([roles.customer, roles.seller]),
  validation.updateUser,
  tryCatch(controller.updateUser)
);

// - DELETE USER
router.delete(
  '/',
  authenticate([roles.admin]),
  tryCatch(controller.deleteUser)
);

// - LOGOUT
router.get(
  '/logout',
  authenticate([roles.customer, roles.admin, roles.seller]),
  tryCatch(controller.logoutUser)
);

export default router;
