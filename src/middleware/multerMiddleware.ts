import * as multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
    return cb(new Error("File must be an image of jpg/png/jpeg only"));
  }
  cb(undefined, true);
};

const upload = multer({ storage, limits: { fileSize: 5000000 }, fileFilter });

export default upload;
