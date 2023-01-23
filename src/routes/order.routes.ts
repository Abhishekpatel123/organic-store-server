import * as express from "express";
import { authenticate } from "../middleware";
import * as controllers from "../controllers/order.controller";
import { tryCatch } from "../utils";

const router = express.Router();

// - Get orders
router.get("/", authenticate, tryCatch(controllers.fetchOrders));

// - Get single order
router.get("/:orderId", authenticate, tryCatch(controllers.fetchOrder));

// - Get total order count

// - Get total sales

// Checkout
router.post("/checkout", authenticate, tryCatch(controllers.createOrder));

// No option for update and delete

export default router;
