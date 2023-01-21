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
      PRODUCTS: "products",
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
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
