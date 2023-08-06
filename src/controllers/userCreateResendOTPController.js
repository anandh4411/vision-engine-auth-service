const generateOTPWithTimestamp = require("../utils/generate-otp-timestamp");
const sendOTPByEmail = require("../utils/send-otp-email");

const { UserTemp } = require("../models/userTempModel");

const UserCreateResendOTPController = {};

// resend otp
UserCreateResendOTPController.resendOtp = async (req, res) => {
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

module.exports = UserCreateResendOTPController;
