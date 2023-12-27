const md5 = require("md5");
const database = require("../db/models");
const {Op} = require("sequelize");

class UserModel {
  // get all users data
  getAllUsers = () => {
    return database.user_game.findAll();
    // SELECT * FROM user_game
  };

  // get username from data source
  getUsername = (username) => {
    const usernameUser = database.user_game.findOne({
      where: {username: username},
    });
    return usernameUser;
  };

  // checking existing email
  getExistingEmail = (email) => {
    const emailUser = database.user_game.findOne({
      where: {email: email},
    });
    return emailUser;
  };

  // checking existing password
  getExistingPassword = (password) => {
    const passwordUser = database.user_game.findOne({
      where: {password: md5(password)},
    });
    return passwordUser;
  };

  // add new data to data source
  addNewUser = (username, email, password) => {
    database.user_game.create({
      username: username,
      email: email,
      password: md5(password),
    });
    // INSERT INTO TABLE(username, email, password) VALUES(...);
  };

  // checking existing user
  getExistingUser = (email, password) => {
    const existUser = database.user_game.findOne({
      where: {
        [Op.and]: [{email: email}, {password: md5(password)}],
      },
    });
    return existUser;
  };
}

module.exports = new UserModel();
