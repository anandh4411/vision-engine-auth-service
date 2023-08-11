const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUpdateUser } = require("../models/userModel");

const UserUpdateController = {};

// update a user
UserUpdateController.updateUser = async (req, res) => {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && req.body[key] === "") {
      delete req.body[key];
    }
  }

  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    _.pick(req.body, ["name", "phone", "password"]),
    { new: true }
  );
  if (!user) return res.status(404).send("User not found.");

  return res.status(200).json(_.pick(user, ["id", "name", "phone"]));
};

module.exports = UserUpdateController;
