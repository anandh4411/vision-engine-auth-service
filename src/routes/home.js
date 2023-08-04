require("dotenv").config();
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message:
      "Hey,  is vision-engine's User Auth Microservice: " +
      process.env.NODE_TEST,
  });
});

module.exports = router;
