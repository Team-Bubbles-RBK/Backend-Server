const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Tokens extends Model {}

Tokens.init(
    {
        temp_Link: {type: DataTypes.STRING, allowNull: false},

    }, {
        sequelize,
        modelName: 'tokens',
        underscored: true,
    }
);



sequelize
.sync()
.then(res => console.log("created"))
module.exports = Tokens;
