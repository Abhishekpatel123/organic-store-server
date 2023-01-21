import mongoose from "mongoose";
import config from "../config";

mongoose.set("strictQuery", false);

const dbConnection = () =>
  mongoose
    .connect(config.mongoConfig.connectionUrl || "")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

export default dbConnection;
