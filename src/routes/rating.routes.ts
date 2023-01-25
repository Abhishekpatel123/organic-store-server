import { Router } from "express";
import { authenticate, tryCatch } from "../middleware";

import * as controllers from "../controllers/rating.controller";
import * as validations from "../validations/rating.validation";

const router = Router();

// - Do rating
router.post(
  "/",
  authenticate,
  validations.doRating,
  tryCatch(controllers.doRating)
);

// - fetch rating and review
router.get(
  "/:productId",
  authenticate,
  tryCatch(controllers.fetchRatingAndReview)
);



export default router;
