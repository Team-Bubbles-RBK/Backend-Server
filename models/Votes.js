const {Model, DataTypes} = require("sequelize");
const sequelize = require("./Index");

class Votes extends Model {
}

Votes.init(
    {
        result: {type: DataTypes.BOOLEAN}
    },
    {
        sequelize,
        modelName: "Votes",
        underscored: true
    }
);

sequelize.sync();
// Export the model in order to use it to query the table
module.exports = Votes;
