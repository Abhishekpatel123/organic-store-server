import * as express from 'express';
import { authenticate, tryCatch } from '../middleware';
import * as controllers from '../controllers/webhook.controller';
import { roles } from '../constants';

const router = express.Router();

router.post(
  '/',
  authenticate([roles.customer]),
  express.raw({ type: 'application/json' }),
  tryCatch(controllers.webhook)
);

export default router;
