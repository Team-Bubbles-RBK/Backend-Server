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
            id,
            {
                include: [
                    {model: Votes}
                ]
            })
            .then(result => {
                // Access the related votes for an invitation and return the value
                if (result) {
                    return result.Votes.reduce((acc, vote) => {
                        return acc && vote.result;
                    }, true);
                }
                return false;
            })
            .catch(err => {
                return err;
            });
    }

    static remove(id) {
        return this.destroy({
            where: {
                id
            }
        }).then(result => {
            return result > 0;
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
