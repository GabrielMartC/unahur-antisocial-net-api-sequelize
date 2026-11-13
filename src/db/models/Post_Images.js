'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Images extends Model {
    static associate(models) {
      //Post
      Post_Images.belongsTo(models.Post, { foreignKey: 'PostId', as: 'Post' });
    }
  }
  Post_Images.init({
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post_Images',
    timestamps:false
  });

  return Post_Images;
};