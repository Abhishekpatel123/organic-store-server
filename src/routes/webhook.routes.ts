import { Router } from "express";
import { tryCatch } from "../middleware";
import * as controllers from "../controllers/webhook.controller";
const router = Router();

router.post("/", controllers.webhook);

export default Router;
