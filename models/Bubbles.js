const Sequelize = require("sequelize");
const sequelize = require("./index")

const Bubble = sequelize.define('bubble',{
    Bubble_Id :{
    type : sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
    },
    name:{
        type:sequelize.STRING,
        allowNull : false,
    },
    perm_link:{
        type : sequelize.STRING,
        allowNull : false
    },
    create_At:{
        type : DataTypes.DATE, 
        allowNull : false
    }
})

module.exports =  Bubble