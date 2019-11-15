const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app

app.get("/", (req, res, next) => {
  console.log("I am a node server");
  return next();
}); 

app.listen(port, () => {
  console.log(`I am listening in port ${port}`);
});
