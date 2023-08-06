const auth = require("../middlewares/auth");
const express = require("express");
const multer = require("multer");
const path = require("path");
const UserController = require("../controllers/userController");
const UserCreateController = require("../controllers/userCreateController");
const UserUpdateController = require("../controllers/userUpdateController");

const router = express.Router();

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

const upload = multer({ storage, fileFilter: imageFilter });

// get all users
router.get("/all", UserController.getAllUsers);

// get one users
router.get("/me", auth, UserController.getUserById);

// create a user - get otp
router.post(
  "/create",
  upload.single("profile-pic"),
  UserCreateController.createUser
);

// create a user - verify otp
router.post("/otp/verify", UserCreateController.verifyOtp);

// create a user - resend otp
router.post("/otp/resend", UserCreateController.resendOtp);

// discard create user
router.post("/discard", UserCreateController.dicardCreateUser);

// delete user
// router.delete("/delete", UserCreateController.deleteUser);

// update a user
router.put("/", auth, UserUpdateController.updateUser);

module.exports = router;
