const express = require("express");
const auth = require("../middlewares/auth");
const multerProfilePicUpload = require("../utils/profile-pic-upload");

const UserController = require("../controllers/userController");
const UserCreateController = require("../controllers/userCreateController");
const UserCreateResendOTPController = require("../controllers/userCreateResendOTPController");
const UserUpdateController = require("../controllers/userUpdateController");
const UserProfilePicUpdateController = require("../controllers/userProfilePicUpdateController");
const UserProfilePicDeleteController = require("../controllers/userProfilePicDeleteController");
const UserDeleteController = require("../controllers/userDeleteController");

const router = express.Router();

// create a user - get otp
router.post(
  "/create",
  multerProfilePicUpload.single("profile_pic"),
  UserCreateController.createUser
);

// create a user - verify otp
router.post("/otp/verify", UserCreateController.verifyOtp);

// create a user - resend otp
router.post("/otp/resend", UserCreateResendOTPController.resendOtp);

// discard create user
router.post("/discard", UserCreateController.dicardCreateUser);

// update a user
router.put("/update", auth, UserUpdateController.updateUser);

// update a user profile pic
router.put(
  "/profile/pic/update",
  auth,
  multerProfilePicUpload.single("profile_pic"),
  UserProfilePicUpdateController.updateUserProfilePic
);

// delete a user profile pic
router.delete(
  "/profile/pic/delete",
  auth,
  UserProfilePicDeleteController.deleteUserProfilePic
);

// delete user
router.delete("/delete", auth, UserDeleteController.deleteUser);

// get all users
router.get("/all", UserController.getAllUsers);

// get one users
router.get("/me", auth, UserController.getUserById);

// get profile pic
router.get("/me/pic", auth, UserController.getProfilePic);

module.exports = router;
