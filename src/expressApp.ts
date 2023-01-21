import * as express from "express";

export default (app: express.Application) => {
  // - Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // - Routings
  app.get("/", (req, res) => res.send("app is working"));

  // - Error handling
};
