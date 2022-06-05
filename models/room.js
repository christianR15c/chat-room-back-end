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
    }
  }
  Room.init(
    {
      room_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
