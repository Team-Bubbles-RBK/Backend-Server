const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("bubbles", "root", "", {
    dialect: "mysql",
    logging: false, // stop logging from Sequelize
});

module.exports = sequelize;
