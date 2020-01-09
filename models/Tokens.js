const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Tokens extends Model {
}

Tokens.init(
    {
        temp_link: {type: DataTypes.STRING, allowNull: false},

    }, {
        sequelize,
        modelName: 'tokens',
        underscored: true,
    }
);


sequelize.sync();
module.exports = Tokens;