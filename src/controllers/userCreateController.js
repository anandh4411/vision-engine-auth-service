const _ = require("lodash");
const fs = require("fs");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { User, validateUser, validateOtp } = require("../models/userModel");
const { UserTemp } = require("../models/userTempModel");

const UserCreateController = {};

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "message.cwa@gmail.com",
    pass: "mmfnjhhafdaouviv",
  },
});

// Generate OTP with timestamp
const generateOTPWithTimestamp = () => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  const timestamp = new Date();
  return { otp, timestamp };
};

// Send OTP via email
const sendOTPByEmail = (email, otp) => {
  const mailOptions = {
    from: "message.cwa@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for account verification is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

// create user
UserCreateController.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    fs.unlinkSync(req.file.path);
    return res.status(400).send(error.details[0].message);
  }
  if (!req.file) {
    return res.status(400).json({ message: "Profile picture not valid." });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send("User already registered.");

  const otpWithTimestamp = generateOTPWithTimestamp();

  const otpSend = await sendOTPByEmail(req.body.email, otpWithTimestamp.otp);
  if (!otpSend)
    return res
      .status(422)
      .send("OTP could not be sent. Please try again later.");

  req.body.otp = otpWithTimestamp.otp;
  req.body.otpTimestamp = otpWithTimestamp.timestamp;
  user = new UserTemp(
    _.pick(req.body, ["name", "email", "password", "otp", "otpTimestamp"])
  );
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  return res.status(200).json(user.email);
};

async function deleteTempUser(id) {
  const user = await UserTemp.findOneAndDelete({ _id: id });
  if (user) return true;
  else return false;
}

// delete user
UserCreateController.deleteUser = async (req, res) => {
  const user = await UserTemp.findOneAndDelete({ _id: req.body.id });
  if (user) return res.status(200).send(_.pick(user, ["id", "name", "email"]));
  else return res.status(404).send("Cannot find and delete the user.");
};

// verify otp
UserCreateController.verifyOtp = async (req, res) => {
  const { error } = validateOtp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, otp } = req.body;
  let user = await UserTemp.findOne({ email });
  if (!user) return res.status(400).send("There is no data with given id.");

  const isOtpValid = user.otp === otp;
  const isOtpExpired =
    Date.now() - user.otpTimestamp.getTime() > 0.5 * 60 * 1000;

  if (!isOtpValid || isOtpExpired)
    return res.status(401).json({ message: "Invalid OTP" });

  const tempUserDeleted = deleteTempUser(user.id);
  if (tempUserDeleted) console.log("temp user deleted");

  user = new User(_.pick(user, ["name", "email", "password"]));
  await user.save();

  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .status(201)
    .json(_.pick(user, ["id", "name", "email"]));
};

// resend otp
UserCreateController.resendOtp = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).send("Email is required.");

  let user = await UserTemp.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("No matching record with email.");

  const otpWithTimestamp = generateOTPWithTimestamp();
  const otpSend = await sendOTPByEmail(req.body.email, otpWithTimestamp.otp);
  if (!otpSend)
    return res
      .status(422)
      .send("OTP could not be sent. Please try again later.");

  user = await UserTemp.findByIdAndUpdate(
    user._id,
    { otp: otpWithTimestamp.otp, otpTimestamp: otpWithTimestamp.timestamp },
    { new: true }
  );

  return res.status(200).json(user.email);
};

module.exports = UserCreateController;
