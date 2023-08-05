const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/userModel");

const UserController = {};

// 1. get all users
// 2. get user by id
// 3. create a user
// 4. update a user

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

// create a user
UserController.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .status(201)
    .json(_.pick(user, ["id", "name", "email"]));
};

module.exports = UserController;
