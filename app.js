const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db")();
require("./config/config")();
require("./src/routes")(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;
