const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// serving static files
app.use("/home", express.static(path.join(__dirname, "public/landingpage")));
app.use("/games", express.static(path.join(__dirname, "public/game")));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
