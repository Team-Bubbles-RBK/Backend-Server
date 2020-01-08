const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bubbles", "root", "", {
  dialect: "mysql"
});

module.exports = sequelize;
