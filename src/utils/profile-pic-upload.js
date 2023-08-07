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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile-pic/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const multerProfilePicUpload = multer({ storage, fileFilter: imageFilter });

module.exports = multerProfilePicUpload;
