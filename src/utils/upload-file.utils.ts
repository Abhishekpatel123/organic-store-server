import * as cloudinary from 'cloudinary';
import config from '../config';

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadFile = async (filePath: string, public_id: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      public_id
    });
    return { imageUrl: result.url, public_id };
  } catch (err) {
    return err;
  }
};

export const deleteFile = async (public_id: string) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    return result;
  } catch (err) {
    return err;
  }
};
