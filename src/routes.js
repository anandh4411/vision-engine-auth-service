require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("../config/cors");
const loggerMiddleware = require("./middlewares/logger");

const home = require("./routes/home");
const user = require("./routes/user");
const login = require("./routes/login");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors(corsOptions));
  // app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  // app.use("/public", express.static(path.join(__dirname, "../public")));
  process.env.NODE_ENV === "development" ? app.use(loggerMiddleware) : null;

  app.use("/", home);
  app.use("/user", user);
  app.use("/login", login);
};
