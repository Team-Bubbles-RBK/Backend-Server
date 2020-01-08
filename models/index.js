const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('bubblerbk','bubbleadmin','bubbleadmin',
{
    port: 3306,
    host: 'db4free.net',
    dialect: 'mysql',
    pool:{
      max:7,
      min:0,
      acquire:30000,
      idle: 10000
    }
});

module.exports = sequelize;
