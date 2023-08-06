const { User } = require("../models/userModel");

const UserController = {};

// 1. get all users
// 2. get user by id

// get all users
UserController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get user by id
UserController.getUserById = async (req, res) => {
  // find user with req.user._id that we get from auth middleware, form request header - x-auth-token
  // and exclude password, then send user as response
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
};

module.exports = UserController;
