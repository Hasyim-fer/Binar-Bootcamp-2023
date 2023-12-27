"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_history.belongsTo(models.user_game, {foreignKey: "userId"});
    }
  }
  user_game_history.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game_history",
    }
  );
  return user_game_history;
};
