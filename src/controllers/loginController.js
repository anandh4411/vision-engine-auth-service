const bcrypt = require("bcrypt");
const { User, validateLoginUser } = require("../models/userModel");

const LoginController = {};

LoginController.loginUser = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send({ user_invalid: true });

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(404).send({ invalid_email_password: true });

  const token = user.generateAuthToken();
  return res.status(200).send({ token: token });
};

module.exports = LoginController;
