import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://adventure-app:adventure@cluster0.rojcz.mongodb.net/organic-store?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

const dbConnection = () =>
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

export default dbConnection;
