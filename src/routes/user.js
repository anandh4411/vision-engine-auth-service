const auth = require("../middlewares/auth");
const express = require("express");
const UserController = require("../controllers/userController");
const UserUpdateController = require("../controllers/userUpdateController");

const router = express.Router();

// get all users
router.get("/all", UserController.getAllUsers);

// get one users
router.get("/me", auth, UserController.getUserById);

// create a user
router.post("/", UserController.createUser);

// update a user
router.put("/", auth, UserUpdateController.updateUser);

module.exports = router;
