const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Index");
const Bubbles = require("./Bubbles");
const Users = require("./Users");

class Votes extends Model {
  get result() {
    if (Votes.findOne({ where: { result: false } })) {
      return false;
    } else {
      return true;
    }
  }
}

Votes.init(
  {
    result: { type: DataTypes.BOOLEAN }
  },
  {
    sequelize,
    modelName: "Votes",
    underscored: true
  }
);

Bubbles.hasMany(Votes);
Votes.belongsTo(Bubbles);

Votes.hasMany(Users);
Users.belongsTo(Votes, { as: "invitee" }, { as: "invitor" });

// Export the model in order to use it to query the table
sequelize.sync();
module.exports = Votes;
