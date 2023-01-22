import * as express from "express";
import { errorHandler } from "./middleware";
import { categoryRoutes, productRoutes, userRoutes } from "./routes";

export default (app: express.Application) => {
  // - Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // - Routings
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/products", productRoutes);
  app.get("/", (req, res) => res.send("app is working"));

  // - Error handling
  app.use(errorHandler);
};
