const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const Tokens = require("./Tokens");
const Messages = require('./Messages');
const moment = require('moment');
const crypto = require('crypto');
const randomString = require("randomstring");

class Bubbles extends Model {
    /****
     * Drop all expired Temp tokens
     * (Tokens with age greater than 24HR)
     */
    static dropExpiredTokens() {
        Tokens.findAll()
            .then(function (tokens) {
                let dateNow = moment();

                tokens.forEach(token => {
                    let tokenCreated = moment(token.createdAt);
                    let difference = dateNow.diff(tokenCreated, 'h');

                    if (difference >= 24) {
                        Tokens.destroy(
                            {
                                where: {
                                    createdAt: token.createdAt
                                }
                            });
                    }
                });
            })
            .catch(err => {
                console.log({err});
            });
    }

    /****
     * Create a new bubble
     * @param name
     * @returns {Promise<Bubbles>}
     */
    static createBubble(name) {
        let permHash = randomString.generate({
            length: 16,
            charset: name.toUpperCase()
        });
        let mykey = crypto.createCipher('aes-128-cbc', permHash);
        let mystr = mykey.update(permHash, 'utf8', 'hex');
        mystr += mykey.final('hex');

        return this.create(
            {
                name,
                perm_link: mystr
            });
    }

    /***
     *  Creates a temp token for a bubble
     * @param bubble_id
     * @return {Promise<Bubbles>}
     */
    static generateToken(bubble_id) {
        // Remove expired tokens
        this.dropExpiredTokens();

        return this.findByPk(bubble_id)
            .then(bubble => {
                if (bubble) {
                    const salt = crypto.randomBytes(16).toString('hex');
                    const tempLink = crypto.pbkdf2Sync(bubble_id, salt, 10000, 16, 'sha512').toString('hex');

                    return Tokens.create({
                        temp_link: tempLink,
                        bubbleId: bubble_id
                    });
                } else {
                    throw Error('Not found');
                }
            });
    }
}

Bubbles.init(
    {
        name: {type: DataTypes.STRING, allowNull: false},
        perm_link: {type: DataTypes.STRING, allowNull: false},

    }, {
        sequelize,
        modelName: 'bubble',
        underscored: true,
    }
);

// Relationship between models
Bubbles.hasMany(Tokens);
Tokens.belongsTo(Bubbles);
Bubbles.hasMany(Messages);

sequelize.sync();
module.exports = Bubbles;