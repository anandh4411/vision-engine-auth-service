require("dotenv").config();
const express = require("express");
const loggerMiddleware = require("../middlewares/logger");

const home = require("./home");
const users = require("./users");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("../../public"));
  process.env.NODE_ENV === "development" ? app.use(loggerMiddleware) : null;

  app.use("/", home);
  app.use("/user", users);
};
