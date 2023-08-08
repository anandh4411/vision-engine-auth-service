require("dotenv").config();
const multer = require("multer");
const path = require("path");

const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) return cb(null, true);
  return cb(false);
};

// Multer configuration for profile picture upload
let uploadDirectory = "uploads/profile-pic/";

// for vercel machine
if (process.env.NODE_ENV == "production")
  uploadDirectory = path.join(process.cwd(), "uploads/profile-pic");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const multerProfilePicUpload = multer({ storage, fileFilter: imageFilter });

module.exports = multerProfilePicUpload;
