const {Model, DataTypes} = require('sequelize');
const sequelize = require('./Index');
const crypto = require('crypto');

/***
 *  MUST Create the tables manually on the database
 *  Instead of using sync()
 */

class Users extends Model {
    get fullName() {
        return this.firstname + ' ' + this.lastname;
    }

    get hashedPassword() {
        return this.get('hash');
    }

    static authenticate(username, password) {
        // hash and compare and return boolean
        return this.findOne({
            where: {
                username: username
            }
        }).then(result => {
            // console.log({un: result.hash});
            const calculatedHash = crypto.pbkdf2Sync(password, result.salt, 10000, 32, 'sha512').toString('hex');
            console.log({uh: result.hash, calculatedHash})
            return result.hash === calculatedHash;
        }).catch(err => {
            console.log({err});
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
    }
);

/**
 * Promise based function to
 * Generate a hash for the user
 */
function hashPassword(password) {
    return new Promise((resolve, reject) => {
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
// Export the model in order to use it to query the table
module.exports = Users;