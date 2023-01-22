import * as Jwt from "jsonwebtoken";
import config from "../config";

const verifyTokenService = async (token: string) => {
  try {
    const decodedToken = await Jwt.verify(token, config.JWT_SECRET);
    return decodedToken;
  } catch (err) {
    return err;
  }
};

export default verifyTokenService;
