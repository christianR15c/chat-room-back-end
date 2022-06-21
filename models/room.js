'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsToMany(models.User, {
        through: 'userRoom',
        foreignKey: 'roomId',
        as: 'users',
      });

      Room.hasMany(models.Message, {
        foreignKey: 'roomId',
        as: 'messages',
      });
    }
  }
  Room.init(
    {
      room_name: DataTypes.STRING,
      createdBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
