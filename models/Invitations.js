const {Model, DataTypes} = require("sequelize");
const sequelize = require("./Index");
const Votes = require("./Votes");
const Users = require("./Users");
const Bubbles = require('./Bubbles');

class Invitations extends Model {
    get result() {
    }
}

Invitations.init(
    {},
    {
        sequelize,
        modelName: "invitations",
        underscored: true
    }
);

// Define relationships between models
Users.hasMany(Votes, {as: 'inviter', foreignKey: 'inviter_id'});
Votes.belongsTo(Invitations);

Invitations.hasMany(Votes);
Invitations.belongsTo(Users, {as: "invitee", foreignKey: "invitee_id"});
Invitations.belongsTo(Bubbles);

Bubbles.hasMany(Invitations);

// Export the model in order to use it to query the table
sequelize.sync();
module.exports = Invitations;
