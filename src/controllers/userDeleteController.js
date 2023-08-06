const fs = require("fs");
const { User } = require("../models/userModel");

const UserDeleteController = {};

UserDeleteController.deleteUser = async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("No data with this id.");

  fs.unlinkSync(user.profilePicPath);
  user = await User.findOneAndDelete({ _id: req.user._id });
  return res.status(200).send(user);
};

module.exports = UserDeleteController;
