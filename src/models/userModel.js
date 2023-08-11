require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  profilePicPath: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(60).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

function validateLoginUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

function validateUpdateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    phone: Joi.string().min(10).max(14),
    password: Joi.string().min(5).max(255),
  });
  return schema.validate(user);
}

function validateOtp(body) {
  const schema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.string().required(),
  });
  return schema.validate(body);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLoginUser = validateLoginUser;
exports.validateUpdateUser = validateUpdateUser;
exports.validateOtp = validateOtp;
