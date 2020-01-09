const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Messages = require('./Messages');
const Bubbles = require('./Bubbles');

/***
 *  In Production MUST Create the tables manually on the database
 *  Instead of using sync()
 */

class Users extends Model {
    /*
    * @params username: String, password: String
    * Authenticate the entered username and password
    * Hash and compare the entered password
    * return JWT token
    * */
    static authenticate(username, password) {
        return this.findOne({
            where: {
                username: username
            }
        }).then(result => {
            const calculatedHash = crypto.pbkdf2Sync(password, result.salt, 10000, 32, 'sha512')
                .toString('hex');

            // From now on we'll identify the user by the id and the id is the
            // only personalized value that goes into our token
            if (result.hash === calculatedHash) {
                let payload = {id: result.id};
                return jwt.sign(payload, 'soFarAway');
            }
            return false;
        }).catch(err => {
            console.error({err});
            return false;
        });
    }

    /***
     * Get all bubbles joined by a user
     * @param user_id
     * @returns {Promise<boolean>}
     */
    static getAllBubbles(user_id) {
        return this.findByPk(user_id, {
            include: [{model: Bubbles}]
        })
            .then(result => {
                return result.bubbles;
            });
    }

    /****
     * This functions allows users to leave
     *  bubbles
     * @param userId
     * @param bubbleId
     * @return {Promise<T>}
     */
    static leaveBubble(userId, bubbleId) {
        return this.findByPk(userId,
            {
                include: [{model: Bubbles}]
            })
            .then(user => {
                return user.removeBubble(bubbleId);
            });
    }

    /***
     *  Adds a user to a bubble
     * @param userId
     * @param bubbleId
     * @return {void|PromiseLike<any>|Promise<any>}
     */
    static joinBubble(userId, bubbleId) {
        return Bubbles.findByPk(
            bubbleId,
            {
                include: [{model: Users}]
            })
            .then(bubble => {
                return bubble.addUser(userId);
            });
    }
}

Users.init(
    {
        first_name: {type: DataTypes.STRING, allowNull: false},
        last_name: {type: DataTypes.STRING, allowNull: false},
        dob: {type: DataTypes.DATE, allowNull: false},
        gender: {type: DataTypes.ENUM('Male', 'Female', 'Unknown'), defaultValue: 'Unknown'},
        username: {type: DataTypes.STRING, allowNull: false},
        hash: {type: DataTypes.STRING, allowNull: true},
        salt: {type: DataTypes.STRING, allowNull: true},
        gravatar_id: {type: DataTypes.STRING, allowNull: true, defaultValue: null},
        gravatar_ext: {type: DataTypes.STRING, allowNull: true, defaultValue: null},
    }, {
        sequelize,
        modelName: 'users',
        underscored: true,
    },
);

/**
 * Promise based function to
 * Generate a hash for the user
 */
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        if (!password) {
            reject('Invalid password');
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512').toString('hex');
        resolve({hash, salt});
    });
}

/**
 * Generate hash before inserting to database
 */
Users.beforeCreate((user, options) => {
    return hashPassword(user.hash).then(result => {
        user.hash = result.hash;
        user.salt = result.salt;
    });
});

/**
 * Generate hash before updating value in the database
 */
Users.beforeUpdate((user, options) => {
    return hashPassword(user.hash).then(result => {
        user.hash = result.hash;
        user.salt = result.salt;
    });
});

// Create table if not exist in the database
sequelize.sync();

// Define relationships between models
Users.hasMany(Messages);
Messages.belongsTo(Users);

// Association table for user_bubble
let user_bubble = sequelize.define(
    'user_bubble',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        underscored: true,
    }
);

Users.belongsToMany(Bubbles, {through: user_bubble});
Bubbles.belongsToMany(Users, {through: user_bubble});

// Export the model in order to use it to query the table
module.exports = Users;