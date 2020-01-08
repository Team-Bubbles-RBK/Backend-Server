const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("messages", "root", "00000000", {
  dialect: "mysql"
});

module.exports = sequelize;
