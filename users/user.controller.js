const userModel = require("./user.model");

class UserController {
  getAllUsers = (req, res) => {
    const allUsers = userModel.getAllUsers();
    res.json(allUsers);
  };

  getUserByUsername = (req, res) => {
    const {username} = req.body;
    const sortedData = userModel.getUsername(username);
    if (!sortedData) {
      res.statusCode = 404;
      res.json({message: `user whith username ${username} is not exist!`});
    } else {
      res.json(sortedData);
    }
  };

  registerNewUser = (req, res) => {
    const requestData = req.body;
    // validation data (data must be enter/data cannot be empty)
    if (requestData.username === undefined || requestData.username === "" || requestData.email === undefined || requestData.email === "" || requestData.password === undefined || requestData.password === "") {
      return res.json({message: "enter the data corectly, cannot be empty!"});
    }

    // username & email must not be the same as another user
    const availableData = userModel.dataIsUsed(requestData);
    if (availableData) {
      res.statusCode = 406;
      return res.json({message: "username or email has been used, try another one!"});
    }

    userModel.addNewUser(requestData);
    res.json({message: `username ${requestData.username} successfully registered as New User`});
  };

  loginExistUser = (req, res) => {
    const {email, password} = req.body;
    // validation data (data must be enter/data cannot be empty)
    if (email === undefined || email === "" || password === undefined || password === "") {
      return res.json({message: "enter the data corectly, data cannot be empty!"});
    }
    // looking for the same email & password as the email & password from req.body
    const sortedData = userModel.getExistingUser(email, password);
    if (!sortedData) {
      const emailUser = userModel.getExistingEmail(email);
      const passwordUser = userModel.getPasswordUser(password);
      res.statusCode = 401;
      if (!emailUser) {
        return res.json({message: `Login Failed: email ${email} is not registered!`});
      } else if (!passwordUser) {
        return res.json({message: `Login Failed: password incorrect!`});
      }
    } else {
      return res.json(sortedData);
    }
  };
}

module.exports = new UserController();
