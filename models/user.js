'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Room, {
        through: 'userRoom',
        foreignKey: 'userId',
        as: 'rooms',
      });

      User.hasMany(models.Message, {
        foreignKey: 'userId',
        as: 'messages',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your name',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your email',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your password',
        },
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          'https://res.cloudinary.com/dmgfxu4fg/image/upload/v1654073043/profile-icon_prev_ui_d7vthy.png',
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
