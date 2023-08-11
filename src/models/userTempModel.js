const mongoose = require("mongoose");

const userTempSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpTimestamp: {
    type: Date,
    required: true,
  },
  profilePicPath: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserTemp = mongoose.model("UserTemp", userTempSchema);

exports.UserTemp = UserTemp;
