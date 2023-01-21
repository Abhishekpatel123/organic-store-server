import * as express from "express";

import expressApp from "./expressApp";
const PORT = 5000;

const startServer = async () => {
  const app: express.Application = express();

  // - Express Code
  expressApp(app);
  
  // - DB connection

  // - Listening
  app
    .listen(PORT, () => console.log(`Listening on port ${PORT}`))
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
