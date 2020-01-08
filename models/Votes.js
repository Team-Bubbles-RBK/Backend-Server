const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Index");

class Votes extends Model {
  get result() {}
}

Votes.init(
  {
    id: { type: DataTypes.INTEGER, AUTO_INCREMENT, primaryKey: true },
    result: { type: DataTypes.BOOLEAN },
    invitor_ID: { type: DataTypes.INTEGER },
    invitee_ID: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "messages",
    underscored: true
  }
);

// Export the model in order to use it to query the table
module.exports = Votes;
