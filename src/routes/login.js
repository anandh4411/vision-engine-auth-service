const express = require("express");
const LoginController = require("../controllers/loginController");

const router = express.Router();

// login a user
router.post("/", LoginController.loginUser);

module.exports = router;
