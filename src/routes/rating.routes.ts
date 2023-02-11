import { Router } from 'express';
import { authenticate, tryCatch } from '../middleware';

import * as controllers from '../controllers/rating.controller';
import * as validations from '../validations/rating.validation';
import { roles } from '../constants';

const router = Router();

// - Do rating
router.post(
  '/',
  authenticate([roles.customer]),
  validations.doRating,
  tryCatch(controllers.doRating)
);

// - fetch rating and review
router.get('/:productId', tryCatch(controllers.fetchRatingAndReview));

export default router;
