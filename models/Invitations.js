const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Index");
const Votes = require("./Votes");

class Invitations extends Model {
  get result() {}
}

Invitations.init(
  {
    id: { type: DataTypes.INTEGER, AUTO_INCREMENT, primaryKey: true },
    bubble_ID: { type: DataTypes.INTEGER, allowNull: false },
    invitee_ID: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "messages",
    underscored: true
  }
);
Invitations.hasMany(Votes);

// Export the model in order to use it to query the table
module.exports = Invitations;
