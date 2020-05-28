const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello Kisso!");
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
