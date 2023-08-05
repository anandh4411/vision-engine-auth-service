const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db")();
require("./src/routes")(app);

if (!process.env.jwtPrivateKey) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;
