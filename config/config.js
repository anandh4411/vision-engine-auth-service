require("dotenv").config();

module.exports = function checkJwtEnvVariable() {
  if (!process.env.jwtPrivateKey) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
  }
};
