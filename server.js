const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res, next) => {
  res.render("index");
  return next();
});

app.listen(port, () => {
  console.log(`I am listening in port ${port}`);
});
