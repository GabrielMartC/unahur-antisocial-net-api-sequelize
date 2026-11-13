'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Pertenece a un usuario
      Post.belongsTo(models.User, { foreignKey: 'UserId', as: 'autor' });
      // 1 a N
      Post.hasMany(models.Post_Images, { foreignKey: 'PostId', as: 'post_images' });
      Post.hasMany(models.Comment, { foreignKey: 'PostId', as: 'comments' });
      // N a N
      Post.belongsToMany(models.Tag, {
        through: 'Post_Tags',
        foreignKey: 'PostId',
        otherKey: 'TagId',
        as: 'tags'
      });
    }
  }
  Post.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps:false
  });
  return Post;
};
