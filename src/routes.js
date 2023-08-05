require("dotenv").config();
const express = require("express");
const loggerMiddleware = require("./middlewares/logger");

const home = require("./routes/home");
const user = require("./routes/user");
const login = require("./routes/login");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("../../public"));
  process.env.NODE_ENV === "development" ? app.use(loggerMiddleware) : null;

  app.use("/", home);
  app.use("/user", user);
  app.use("/login", login);
};
