const {Model, DataTypes} = require('sequelize');
const sequelize = require('./Index');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/***
 *  MUST Create the tables manually on the database
 *  Instead of using sync()
 */

class Users extends Model {
    /*
    * @params username: String, password: String
    * Authenticate the entered username and password
    * Hash and compare the entered password
    * return boolean
    * */
    static authenticate(username, password) {
        return this.findOne({
            where: {
                username: username
            }
        }).then(result => {
            const calculatedHash = crypto.pbkdf2Sync(password, result.salt, 10000, 32, 'sha512')
                .toString('hex');

            // from now on we'll identify the user by the id and the id is the
            // only personalized value that goes into our token
            if (result.hash === calculatedHash) {
                let payload = {id: result.id};
                let token = jwt.sign(payload, 'soFarAway');
                return token;
            }
            return false;
        }).catch(err => {
            console.log({err});
            return false;
        });
    }

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'steveHarris');
    };
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
    }
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
// sequelize.sync();

// Export the model in order to use it to query the table
module.exports = Users;