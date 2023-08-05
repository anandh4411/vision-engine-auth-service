const express = require("express");
const loggerMiddleware = require("./src/middlewares/logger");
require("dotenv").config();
require("./config/db")();

const app = express();
app.use(express.json());
app.use(express.static("public"));
if (process.env.NODE_ENV === "development") app.use(loggerMiddleware);
require("./src/routes/routes")(app);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;
