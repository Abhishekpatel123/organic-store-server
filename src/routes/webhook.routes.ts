import * as express from "express";
import { tryCatch } from "../middleware";
import * as controllers from "../controllers/webhook.controller";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  tryCatch(controllers.webhook)
);

export default router;
