const { User, validateUser } = require("../models/userModel");

const UserController = {};

// 1. get all users
// 2. get user by id
// 3. create a user

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
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
};

module.exports = UserController;
