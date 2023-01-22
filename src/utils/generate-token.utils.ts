import * as jwt from "jsonwebtoken";
import config from "../config";

const generateToken = (payload: any, expiresIn = "1d"): string => {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn });
  return token;
};

export default generateToken;
