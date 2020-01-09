const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('bubblerbk','bubbleadmin','bubbleadmin',
{
    port: 3306,
    host: 'db4free.net',
    dialect: 'mysql',
    connectTimeout: 30000,
    pool:{
      max:7,
      min:0,
      acquire:30000,
      idle: 1

    }
});

module.exports = sequelize;
