import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
