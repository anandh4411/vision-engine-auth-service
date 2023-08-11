const fs = require("fs");
const { User } = require("../models/userModel");

const UserProfilePicDeleteController = {};

UserProfilePicDeleteController.deleteUserProfilePic = async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("User doesnt exists.");

  if (!user.profilePicPath)
    return res.status(404).send("User doesnt has a profile picture.");

  fs.unlinkSync(user.profilePicPath);

  user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { profilePicPath: "" } },
    { new: true }
  );

  return res.status(200).send("Profile picture removed.");
};

module.exports = UserProfilePicDeleteController;
