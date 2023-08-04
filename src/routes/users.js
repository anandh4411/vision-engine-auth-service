const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// get all users
router.get("/all", UserController.getAllUsers);

// create a user
router.post("/", UserController.createUser);

module.exports = router;
