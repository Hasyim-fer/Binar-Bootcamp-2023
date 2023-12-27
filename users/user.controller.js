const userModel = require("./user.model");

class UserController {
  getAllUsers = async (req, res) => {
    try {
      const allUsers = await userModel.getAllUsers();
      res.json(allUsers);
    } catch (error) {
      res.json({message: "internal server error"});
    }
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

  getUserById = async (req, res) => {
    const {id} = req.params;
    const userId = await userModel.getUserById(id);
    if (userId) {
      res.json(userId);
    } else {
      res.statusCode = 404;
      res.json({message: `id: ${id} doesnt exist!`});
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

  updateUserBiodata = async (req, res) => {
    const {userId} = req.params;
    const dataBody = req.body;
    const existUserId = await userModel.findUserIdBio(userId);

    try {
      if (existUserId) {
        const updateBiodata = await userModel.updateBiodata(userId, dataBody);
        res.json({message: `updated user biodata with id ${userId}`});
        return updateBiodata;
      } else if (!existUserId) {
        const createBiodata = await userModel.createBiodata(userId, dataBody);
        res.json({message: `created user biodata with id ${userId}`});
        return createBiodata;
      }
    } catch (error) {
      res.json({message: `user not found`});
    }
  };

  getAllGames = async (req, res) => {
    const {id} = req.params;
    const data = await userModel.getGameHistories(id);
    res.json(data);
  };

  createGames = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
      const user = await userModel.getUserById(id);
      if (!user) {
        res.statusCode = 404;
        res.json({message: `user not found!`});
      } else {
        if (status === "win" || status === "draw" || status === "lose") {
          await userModel.createGameHistory(id, status);
          return res.json({message: `created new history games of user with id ${id}`});
        } else {
          return res.json({message: `status value must (win/draw/lose)`});
        }
      }
    } catch (error) {
      res.json({message: "internal server error"});
    }
  };
}

module.exports = new UserController();
