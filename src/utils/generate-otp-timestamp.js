const otpGenerator = require("otp-generator");

// Generate OTP with timestamp
module.exports = () => {
  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const timestamp = new Date();
  return { otp, timestamp };
};
