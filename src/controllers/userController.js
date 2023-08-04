const User = require("../models/userModel");

const UserController = {};

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
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// create a user
UserController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: "Could not create the user." });
  }
};

module.exports = UserController;
