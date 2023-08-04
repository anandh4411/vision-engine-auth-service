const express = require("express");
const connectToDatabase = require("./config/db");
const loggerMiddleware = require("./src/middlewares/logger");
require("dotenv").config();

// importing apis
const home = require("./src/routes/home");
const users = require("./src/routes/users");

connectToDatabase();

const app = express();
app.use(express.json());
app.use(express.static("public"));
if (process.env.NODE_ENV === "development") app.use(loggerMiddleware);

// routes
app.use("/", home);
app.use("/user", users);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));
