import "./config";
import * as express from "express";

import expressApp from "./expressApp";
import dbConnection from "./database/connection";
const PORT = 5000;
const startServer = async () => {
  const app: express.Application = express();

  // - Express Code
  expressApp(app);

  // - DB connection
  dbConnection();

  // - Listening
  app
    .listen(PORT, () => console.log(`Listening on port ${PORT}`))
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
