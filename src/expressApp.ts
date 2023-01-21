import * as express from "express";
import { userRoutes } from "./routes";

export default (app: express.Application) => {
  // - Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // - Routings
  app.use("/api/v1/users", userRoutes);
  app.get("/", (req, res) => res.send("app is working"));

  // - Error handling
};
