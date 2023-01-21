import * as dotenv from "dotenv";

dotenv.config();

export default {
  // - DB config
  mongoConfig: {
    connectionUrl: process.env.MONGO_URL,
    database: "",
    collections: {
      USERS: "users",
    },
  },
  
  //
  PORT: process.env.PORT,
  SERVER_URL: process.env.BACKEND_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};
