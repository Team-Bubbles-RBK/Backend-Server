const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const Tokens = require("./Tokens");
const Messages = require('./Messages');

class Bubbles extends Model {
}

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

// Relationship between models
Bubbles.hasMany(Tokens);
Tokens.belongsTo(Bubbles);
Bubbles.hasMany(Messages);

sequelize.sync();
module.exports = Bubbles;