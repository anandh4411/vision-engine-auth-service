const _ = require("lodash");
const fs = require("fs");
const bcrypt = require("bcrypt");
const generateOTPWithTimestamp = require("../utils/generate-otp-timestamp");
const sendOTPByEmail = require("../utils/send-otp-email");

const { User, validateUser, validateOtp } = require("../models/userModel");
const { UserTemp } = require("../models/userTempModel");

const UserCreateController = {};

// 1. reusable delete temp user function
// 2. create user
// 3. dicard create user
// 4. verify otp

// reusable delete temp user function
async function deleteTempUser(email) {
  const user = await UserTemp.findOneAndDelete({ email: email });
  if (user) return true;
  else return false;
}

// create user
UserCreateController.createUser = async (req, res) => {
  let user;
  if (req.body.email) user = await User.findOne({ email: req.body.email });
  if (user) return res.status(200).send({ user_exists: true });

  const { error } = validateUser(req.body);
  if (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).send(error.details[0].message);
  }
  // if (!req.file) {
  //   return res.status(400).json({ message: "Profile picture not valid." });
  // }

  user = await UserTemp.findOne({ email: req.body.email });
  if (user) {
    fs.unlinkSync(user.profilePicPath);
    await UserTemp.findOneAndDelete({ _id: user.id });
  }

  const otpWithTimestamp = generateOTPWithTimestamp();

  const otpSend = await sendOTPByEmail(req.body.email, otpWithTimestamp.otp);
  if (!otpSend)
    return res
      .status(422)
      .send("OTP could not be sent. Please try again later.");

  req.body.otp = otpWithTimestamp.otp;
  req.body.otpTimestamp = otpWithTimestamp.timestamp;
  req.body.profilePicPath = req.file ? req.file.path : null;

  user = new UserTemp(
    _.pick(req.body, [
      "name",
      "email",
      "phone",
      "password",
      "otp",
      "otpTimestamp",
      "profilePicPath",
    ])
  );
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  return res.status(200).json(user.email);
};

// dicard create user
UserCreateController.dicardCreateUser = async (req, res) => {
  const user = await UserTemp.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("No data with this email.");

  if (user.profilePicPath) fs.unlinkSync(user.profilePicPath);
  deleteTempUser(req.body.email);
  return res.status(200).send("Discarded create user.");
};

// verify otp
UserCreateController.verifyOtp = async (req, res) => {
  const { error } = validateOtp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, otp } = req.body;
  let user = await UserTemp.findOne({ email });
  if (!user) return res.status(400).send("There is no data with given email.");

  const isOtpValid = user.otp === otp;
  const isOtpExpired =
    Date.now() - user.otpTimestamp.getTime() > 0.5 * 60 * 1000;

  if (!isOtpValid || isOtpExpired)
    return res.status(200).json({ invalid_otp: true });

  deleteTempUser(user.email);

  user = new User(
    _.pick(user, ["name", "email", "phone", "password", "profilePicPath"])
  );
  await user.save();

  user.token = user.generateAuthToken();
  return res
    .status(201)
    .json(_.pick(user, ["id", "name", "email", "phone", "token"]));
};

module.exports = UserCreateController;
