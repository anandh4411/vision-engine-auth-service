const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db")();
require("./src/routes/routes")(app);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;
