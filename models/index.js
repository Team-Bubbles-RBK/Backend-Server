const {Sequelize} = require("sequelize");


const sequelize = new Sequelize('bubbles', 'root', '',
    {
        dialect: 'mysql',
        logging: false,
    });

module.exports = sequelize;
