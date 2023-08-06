const nodemailer = require("nodemailer");

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "message.cwa@gmail.com",
    pass: "mmfnjhhafdaouviv",
  },
});

module.exports = transporter;
