const md5 = require("md5");
const database = require("../db/models");
const {Op} = require("sequelize");

class UserModel {
  // get all users data
  getAllUsers = () => {
    return database.user_game.findAll({
      include: [database.user_game_biodata],
    });
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

  getUserById = (id) => {
    return database.user_game.findOne({where: {id: id}});
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

  findUserIdBio = (userId) => {
    return database.user_game_biodata.findOne({where: {userId: userId}});
  };

  updateBiodata = (userId, dataBody) => {
    const update = database.user_game_biodata.update(
      {
        fullname: dataBody.fullname,
        phone: dataBody.phone,
        birth: dataBody.birth,
        address: dataBody.address,
        gender: dataBody.gender,
      },
      {
        where: {userId: userId},
      }
    );
    return update;
  };

  createBiodata = (userId, dataBody) => {
    const create = database.user_game_biodata.create(
      {
        fullname: dataBody.fullname,
        phone: dataBody.phone,
        birth: dataBody.birth,
        gender: dataBody.gender,
        userId: userId,
      },
      {
        where: {userId: userId},
      }
    );
    return create;
  };

  getGameHistories = (id) => {
    return database.user_game.findAll({
      include: [database.user_game_history],
      where: {id: id},
    });
  };

  createGameHistory = (id, status) => {
    return database.user_game_history.create({
      userId: id,
      status,
    });
  };
}

module.exports = new UserModel();
