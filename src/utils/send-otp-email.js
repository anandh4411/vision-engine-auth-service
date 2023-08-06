const transporter = require("./nodemailer-transporter");

// Send OTP via email
module.exports = (email, otp) => {
  const mailOptions = {
    from: "message.cwa@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for account verification is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};
