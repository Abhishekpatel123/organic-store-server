import * as dotenv from "dotenv";

dotenv.config();

export default {
  // - DB config
  mongoConfig: {
    connectionUrl: process.env.MONGO_URL,
    database: "",
    collections: {
      USERS: "users",
      ADDRESSES: "addresses",
      CATEGORIES: "categories",
    },
  },
  // - Mail
  nodemailerConfig: {
    EMAIL: process.env.EMAIL_USERNAME,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
  //
  PORT: process.env.PORT,
  SERVER_URL: process.env.BACKEND_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET:
    process.env.JWT_SECRET || "sdfsflsdfjslkfjsldfjslfsjflsffjfdffdjkb",
};
