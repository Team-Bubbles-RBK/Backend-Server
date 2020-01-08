const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bubble", "root", "", {
  dialect: "mysql"
});

module.exports = sequelize;
