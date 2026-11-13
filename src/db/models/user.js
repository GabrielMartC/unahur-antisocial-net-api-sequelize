'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //Asociacion 1 a N
      User.hasMany(models.Post, { foreignKey: 'UserId', as: 'Posts' });
      User.hasMany(models.Comment, { foreignKey: 'UserId', as: 'Comments' });
    }
  }
  User.init({
    nickName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps:false
  });
  return User;
};