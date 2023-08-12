const path = require("path");
const fs = require("fs");
const { User } = require("../models/userModel");

const UserController = {};

// 1. get all users
// 2. get user by id

// get user by id
UserController.getUserById = async (req, res) => {
  // find user with req.user._id that we get from auth middleware, form request header - x-auth-token
  // and exclude password, then send user as response
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User doesnt exists.");
  return res.status(200).send(user);
};

// get user pic
UserController.getProfilePic = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user._id).select("profilePicPath");
  } catch {
    return res.status(404).send("User not found with this id.");
  }
  const imagePath = path.join(process.cwd(), user.profilePicPath);
  if (!fs.existsSync(imagePath)) return res.status(404).send("Image not found");
  return res.sendFile(imagePath);
};

// get all users
UserController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get all users
UserController.deleteAllProPic = async (req, res) => {
  const directory = path.join(process.cwd(), "uploads/profile-pic/");
  try {
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return res.status(500).send("Internal Server Error");
      }
      // Filter PNG files
      const pngFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === ".png"
      );

      // Delete each PNG file
      pngFiles.forEach((pngFile) => {
        const filePath = path.join(directory, pngFile);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", filePath, err);
          } else {
            console.log("Deleted file:", filePath);
          }
        });
      });
      return res.status(200).send("PNG files deleted successfully");
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = UserController;
