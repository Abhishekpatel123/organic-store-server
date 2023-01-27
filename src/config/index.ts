import "dotenv/config";
import { cleanEnv, str, email, num } from "envalid";

const env = cleanEnv(process.env, {
  MONGO_URL: str(),
  PORT: num(),
  SERVER_URL: str(),
  CLIENT_URL: str(),
  EMAIL_USERNAME: str(),
  EMAIL_PASSWORD: str(),
  JWT_SECRET: str(),
  CLOUDINARY_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  STRIPE_SECRET_KEY: str(),
  STRIPE_ENDPOINT_SECRET: str(),
});

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
      ORDERS: "orders",
      CARTS: "carts",
      WISHLISTS: "wishlists",
      RATINGS: "ratings",
    },
  },
  // - Mail
  nodemailerConfig: {
    EMAIL: env.EMAIL_USERNAME,
    PASSWORD: env.EMAIL_PASSWORD,
  },
  //
  PORT: env.PORT,
  SERVER_URL: env.SERVER_URL,
  CLIENT_URL: env.CLIENT_URL,
  JWT_SECRET: env.JWT_SECRET || "sdfsflsdfjslkfjsldfjslfsjflsffjfdffdjkb",
  CLOUDINARY_NAME: env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET,
  STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY || "",
  STRIPE_ENDPOINT_SECRET: env.STRIPE_ENDPOINT_SECRET,
};
