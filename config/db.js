require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL + "/vision-engine";

function connectToDatabase() {
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB.."))
    .catch((err) => console.log("Error connecting to MongoDB: " + err));
}

module.exports = connectToDatabase;
