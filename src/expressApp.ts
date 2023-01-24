import * as express from "express";
import { errorHandler } from "./middleware";
import { cartRoutes, categoryRoutes, orderRoutes, productRoutes, ratingRoutes, userRoutes, wishlistRoutes } from "./routes";

export default (app: express.Application) => {
  // - Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // - Routings
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/carts", cartRoutes);
  app.use("/api/v1/wishlists", wishlistRoutes);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/ratings", ratingRoutes);
  app.get("/", (req, res) => res.send("app is working"));

  // - Error handling
  app.use(errorHandler);
};
