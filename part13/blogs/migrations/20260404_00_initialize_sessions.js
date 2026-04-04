const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blog_users", "disabled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      blog_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blog_users", key: "id" },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled");
    await queryInterface.dropTable("sessions");
  },
};
