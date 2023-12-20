const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const userRouter = require("./users/user.route");

// serving static files
app.use("/home", express.static(path.join(__dirname, "public/landingpage")));
app.use("/games", express.static(path.join(__dirname, "public/game")));
// middleware for read request body as json
app.use(express.json());
// middleware routing API
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({message: "Hello there! there is nothing here, add /home or /game in query(localhost:3000) or open readme.txt"});
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
