const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateLoginUser } = require("../models/userModel");

const LoginController = {};

LoginController.loginUser = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  return res.status(200).send(token);
};

module.exports = LoginController;
