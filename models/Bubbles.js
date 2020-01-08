const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const Tokens = require("./Tokens")
class Bubbles extends Model {}

Bubbles.init(
    {
        name: {type: DataTypes.STRING, allowNull: false},
        perm_link: {type: DataTypes.STRING, allowNull: false},
        
    }, {
        sequelize,
        modelName: 'bubble',
        underscored: true,
    }
);
Bubbles.hasMany(Tokens); 
Tokens.belongsTo(Bubbles)


// sequelize
// .sync()
// .then(res => console.log("created"))
module.exports = Bubbles;