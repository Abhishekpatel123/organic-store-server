import * as express from "express";

const app: express.Application = express();

const Port = 5000;
app.listen(Port, () => {
  console.log("listening on Port", Port);
});
