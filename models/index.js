const Sequelize = require('sequelize');

const sequelize = new Sequelize("bubbles",'root','123456789',{
    dialect : 'mysql',
    host : 'localhost'
})

sequelize
.sync()
.then(res => console.log("created"))

module.exports = sequelize
