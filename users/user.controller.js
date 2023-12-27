const userModel = require("./user.model");

class UserController {
  getAllUsers = async (req, res) => {
    const allUsers = await userModel.getAllUsers();
    res.json(allUsers);
  };

  getUserByUsername = async (req, res) => {
    const {username} = req.body;
    const sortedData = await userModel.getUsername(username);
    if (!sortedData) {
      res.statusCode = 404;
      res.json({message: `user whith username ${username} is not exist!`});
    } else {
      res.json(sortedData);
    }
  };

  registerNewUser = async (req, res) => {
    const {username, email, password} = req.body;
    // validation data (data must be enter/data cannot be empty)
    if (username === undefined || username === "" || email === undefined || email === "" || password === undefined || password === "") {
      return res.json({message: "enter the data corectly, cannot be empty!"});
    }

    // username & email must not be the same as another user
    const availableUsername = await userModel.getUsername(username);
    const availableEmail = await userModel.getExistingEmail(email);
    if (availableUsername) {
      res.statusCode = 406;
      return res.json({message: `username : ${username} has been used, try another one!`});
    } else if (availableEmail) {
      res.statusCode = 406;
      return res.json({message: `email : ${email} has been used, try another one!`});
    }

    userModel.addNewUser(username, email, password);
    res.json({message: `${username} successfully registered as New User`});
  };

  loginExistingUser = async (req, res) => {
    const {email, password} = req.body;
    // validation data (data must be enter/data cannot be empty)
    if (email === undefined || email === "" || password === undefined || password === "") {
      return res.json({message: "enter the data corectly, data cannot be empty!"});
    }
    // looking for the same email & password as the email & password from req.body
    const sortedData = await userModel.getExistingUser(email, password);
    if (!sortedData) {
      const emailExist = await userModel.getExistingEmail(email);
      const passwordExist = await userModel.getExistingPassword(password);
      res.statusCode = 401;
      if (!emailExist) {
        return res.json({message: `Login Failed: email ${email} is not registered!`});
      } else if (!passwordExist) {
        return res.json({message: `Login Failed: password incorrect!`});
      }
    } else {
      return res.json(sortedData);
    }
  };
}

module.exports = new UserController();
