const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const Tokens = require("./Tokens");
const Messages = require('./Messages');
const moment = require('moment');
const crypto = require('crypto');
const randomString = require("randomstring");

class Bubbles extends Model {
    // Todo update this code or check if it works
    static dropExpiredTokens() {
        //drop column when it pass 24 hour
        Tokens.findAll({attributes: ["created_at"]}).then(function (res) {
            let dateNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            res.forEach(elm => {
                let diffBetweenDate = moment.utc(moment(dateNow).diff(moment(elm.dataValues.created_at, "DD/MM/YYYY HH:mm:ss"))).format("HH")
                console.log(diffBetweenDate)
                if (diffBetweenDate === "24") {
                    //for testing
                    Tokens.destroy({
                        where: {
                            created_at: elm.dataValues.created_at
                        }
                    })
                }
            })
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
     * @return {Promise<T>}
     */
    static generateToken(bubble_id) {
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