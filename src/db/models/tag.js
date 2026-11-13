'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // N a N
      Tag.belongsToMany(models.Post, {
        through: 'Post_Tags',
        foreignKey: 'TagId',
        otherKey: 'PostId',
        as: 'Posts'
      });
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
    updatedAt: false,
    timestamps:false
  });
  return Tag;
};
