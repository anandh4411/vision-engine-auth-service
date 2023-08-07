const _ = require("lodash");
const fs = require("fs");
const { User } = require("../models/userModel");

const UserProfilePicUpdateController = {};

UserProfilePicUpdateController.updateUserProfilePic = async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("User doesnt exists.");

  if (!req.file) return res.status(400).send("Profile picture required.");

  if (user.profilePicPath) fs.unlinkSync(user.profilePicPath);

  user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePicPath: req.file.path },
    { new: true }
  );

  return res.status(200).send(_.pick(user, ["profilePicPath"]));
};

module.exports = UserProfilePicUpdateController;
