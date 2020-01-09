const {Model, DataTypes} = require("sequelize");
const sequelize = require("./index");
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

    /***
     * This methods removes an invitation
     * from the system
     * @param id
     * @returns {Promise<boolean>}
     */
    static remove(id) {
        return this.destroy({
            where: {
                id
            }
        }).then(result => {
            return result > 0;
        });
    }

    /****
     *  This function finds or create an invitation record
     * @param invitee_id
     * @param bubble_id
     * @returns {Promise<[Invitations, boolean]>}
     */
    static generate(invitee_id, bubble_id) {
        return this.findOrCreate({
            where: {
                invitee_id,
                bubbleId: bubble_id // this relation is mapped by Sequelize without any alias
            },
        });
    }

    /***
     *  This method casts a vote for an user of the bubble
     * @param invitationId
     * @param voterId
     * @param result
     * @return {Promise<Votes>}
     */
    static vote(invitationId, voterId, result) {
        // update user_bubble if all accept
        return Votes.create({
            invitationId,
            voter_id: voterId,
            result
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
Votes.belongsTo(Invitations);
Invitations.hasMany(Votes);

// Export the model in order to use it to query the table
sequelize.sync();
module.exports = Invitations;
