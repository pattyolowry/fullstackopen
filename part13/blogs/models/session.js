const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blog_users", key: "id" },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "session",
  },
);

module.exports = Session;
