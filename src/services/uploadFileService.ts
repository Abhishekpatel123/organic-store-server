import * as cloudinary from "cloudinary";
import config from "../config";

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadFile = async (filePath: string, public_id: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      public_id
    });
    return result.url;
  } catch (err) {
    return err;
  }
};

export default uploadFile;
