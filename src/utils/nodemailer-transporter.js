require("dotenv").config();
const nodemailer = require("nodemailer");

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
