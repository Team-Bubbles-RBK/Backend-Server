const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const Tokens = require("./Tokens");
const Messages = require('./Messages');
const moment = require('moment');

class Bubbles extends Model {
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

    static generateToken(bubble_id) {

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