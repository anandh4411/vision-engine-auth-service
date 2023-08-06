const otpGenerator = require("otp-generator");

// Generate OTP with timestamp
module.exports = () => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  const timestamp = new Date();
  return { otp, timestamp };
};
