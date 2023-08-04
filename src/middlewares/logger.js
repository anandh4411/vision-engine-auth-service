const morgan = require("morgan");

const loggerMiddleware = morgan("tiny");
console.log("---- morgan enabled ----");

module.exports = loggerMiddleware;
