const express = require("express");
const md5 = require("md5");
const app = express();
const port = 3000;
const path = require("path");

// serving static files
app.use("/home", express.static(path.join(__dirname, "public/landingpage")));
app.use("/games", express.static(path.join(__dirname, "public/game")));

// middleware for read request body as json
app.use(express.json());

// temporarry data source
let userDataList = [
  {
    id: 1,
    username: "test",
    email: "test@gmail.com",
    password: md5("userpassword1"),
  },
];

app.get("/", (req, res) => {
  res.json({message: "Hello there! there is nothing here, add /home or /game in query(localhost:3000) or open readme.txt"});
});

// API to get all users data
app.get("/users", (req, res) => {
  res.json(userDataList);
});

// API to get user by username
app.post("/users", (req, res) => {
  const {username} = req.body;
  // looking for the same username as the username from req.body
  const sortedData = userDataList.find((data) => {
    return data.username === username;
  });
  if (!sortedData) {
    res.statusCode = 404;
    res.json({message: `user whith username ${username} is not exist!`});
  } else {
    res.json(sortedData);
  }
});

// API to Register a new User
app.post("/register", (req, res) => {
  const requestData = req.body;
  // validation data (data must be enter/data cannot be empty)
  if (requestData.username === undefined || requestData.username === "" || requestData.email === undefined || requestData.email === "" || requestData.password === undefined || requestData.password === "") {
    return res.json({message: "enter the data corectly, cannot be empty!"});
  }

  // check available data
  // username & email must not be the same as another user
  const availableUser = userDataList.find((data) => {
    return requestData.username === data.username || requestData.email === data.email;
  });
  if (availableUser) {
    res.statusCode = 406;
    return res.json({message: "username or email has been used, try another one!"});
  }

  // add new data into userDataList
  userDataList.push({
    id: userDataList.length + 1,
    username: requestData.username,
    email: requestData.email,
    password: md5(requestData.password),
  });
  res.json({message: `username ${requestData.username} successfully registered as New User`});
});

// API to Login
app.get("/login", (req, res) => {
  const {email, password} = req.body;
  // validation data (data must be enter/data cannot be empty)
  if (email === undefined || email === "" || password === undefined || password === "") {
    return res.json({message: "enter the data corectly, data cannot be empty!"});
  }
  // looking for the same email & password as the email & password from req.body
  const sortedData = userDataList.find((data) => {
    return data.email === email && data.password === md5(password);
  });
  if (!sortedData) {
    // checking email
    const emailUser = userDataList.find((data) => {
      return data.email === email;
    });
    // checking password
    const passwordUser = userDataList.find((data) => {
      return data.password === md5(password);
    });
    res.statusCode = 401;
    if (!emailUser) {
      return res.json({message: `Login Failed: email ${email} is not registered!`});
    } else if (!passwordUser) {
      return res.json({message: `Login Failed: password incorrect!`});
    }
  } else {
    return res.json(sortedData);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
