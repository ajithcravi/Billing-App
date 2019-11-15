const express = require("express");
const cors = require("cors")

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  console.log("I am a node server");
  return next();
});

app.listen(port, (req, res) => {
  console.log(`I am listening in port ${port}`);
});
