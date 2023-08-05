// importing apis
const home = require("./home");
const users = require("./users");

module.exports = function (app) {
  app.use("/", home);
  app.use("/user", users);
};
