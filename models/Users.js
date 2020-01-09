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