"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_biodata.belongsTo(models.user_game, {foreignKey: "userId"});
    }
  }
  user_game_biodata.init(
    {
      fullname: DataTypes.STRING,
      phone: DataTypes.STRING,
      birth: DataTypes.STRING,
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game_biodata",
    }
  );
  return user_game_biodata;
};
