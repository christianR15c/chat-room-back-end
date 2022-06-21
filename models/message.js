'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Room, {
        foreignKey: 'roomId',
        as: 'room',
      });

      Message.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      messageType: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
