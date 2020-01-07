const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
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



module.exports = Bubbles;