'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'UserId', as: 'User' });
      Comment.belongsTo(models.Post, { foreignKey: 'PostId', as: 'Post' });
    }
  }
  Comment.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isVisible: {
      type: DataTypes.VIRTUAL,
      get() {
        const maxMeses = parseInt(process.env.COMMENT_MAX_MESES, 10);
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - maxMeses);
        return new Date(this.fechaCreacion) >= fechaLimite;
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: false
  });
  return Comment;
};
