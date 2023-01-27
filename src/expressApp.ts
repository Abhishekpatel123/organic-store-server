import * as express from "express";
import * as cors from "cors";
import { errorHandler } from "./middleware";
import {
  cartRoutes,
  categoryRoutes,
  orderRoutes,
  productRoutes,
  ratingRoutes,
  userRoutes,
  webhookRoutes,
  wishlistRoutes,
} from "./routes";
import * as compression from "compression";
import BaseError from "./errors/base-error";

export default (app: express.Application) => {
  // - Middleware
  app.use(cors({ origin: "*" }));
  app.use("/api/v1/webhook", webhookRoutes);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    compression({
      level: 6, // -1 set to default compression level
      // threshold : // less then threshold size will not compress
    })
  );

  // - Routings
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/carts", cartRoutes);
  app.use("/api/v1/wishlists", wishlistRoutes);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/ratings", ratingRoutes);
  app.get("/", (req, res) => res.send("app is working".repeat(10000)));

  // - Error handling
  app.use(errorHandler);

  // Programmer errors
  process.on("uncaughtException", (error: BaseError) => {
    // logger(error)

    // - If error is programmer error
    if (!error.isOperational) process.exit(1);
  });

  process.on("unhandledRejection", (reason: Error) => {
    throw reason;
  });
};
