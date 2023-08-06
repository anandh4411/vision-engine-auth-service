const auth = require("../middlewares/auth");
const express = require("express");
const multerProfilePicUpload = require("../utils/profile-pic-upload");
const UserController = require("../controllers/userController");
const UserCreateController = require("../controllers/userCreateController");
const UserUpdateController = require("../controllers/userUpdateController");
const UserDeleteController = require("../controllers/userDeleteController");

const router = express.Router();

// create a user - get otp
router.post(
  "/create",
  multerProfilePicUpload.single("profile-pic"),
  UserCreateController.createUser
);

// create a user - verify otp
router.post("/otp/verify", UserCreateController.verifyOtp);

// create a user - resend otp
router.post("/otp/resend", UserCreateController.resendOtp);

// discard create user
router.post("/discard", UserCreateController.dicardCreateUser);

// get all users
router.get("/all", UserController.getAllUsers);

// get one users
router.get("/me", auth, UserController.getUserById);

// update a user
router.put("/", auth, UserUpdateController.updateUser);

// delete user
router.delete("/delete", auth, UserDeleteController.deleteUser);

module.exports = router;
