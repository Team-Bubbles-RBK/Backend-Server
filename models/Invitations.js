const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Index");
const Votes = require("./Votes");
const Users = require("./Users");

class Invitations extends Model {
  get result() {}
}

Invitations.init(
  {},
  {
    sequelize,
    modelName: "invitations",
    underscored: true
  }
);

Invitations.hasMany(Votes);
Votes.belongsTo(Invitations);

// Users.hasMany(Invitations);
// Invitations.belongsTo(Users, { as: "invitee" });

// Export the model in order to use it to query the table
sequelize.sync();
module.exports = Invitations;
