const {Model, DataTypes} = require("sequelize");
const sequelize = require("./Index");
const Votes = require("./Votes");
const Users = require("./Users");
const Bubbles = require('./Bubbles');

class Invitations extends Model {
    /***
     * This function gets the result of the voting for
     * an invitation.
     * @param id
     * @returns {Promise<T>}
     */
    static result(id) {
        return this.findByPk(
            1,
            {
                include: [
                    {model: Votes}
                ]
            })
            .then(result => {
                // Access the related votes for an invitation and return the value
                return result.Votes.reduce((acc, vote) => {
                    return acc && vote.result;
                }, true);
            })
            .catch(err => {
                return err;
            });
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
