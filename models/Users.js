const {Model, DataTypes} = require('sequelize');
const sequelize = require('./Index');

class Users extends Model {
    get fullName() {
        return this.firstname + ' ' + this.lastname;
    }

    set password(password) {
        // set hash and salt on user creation
        const hash = password + '@@@';
        this.setDataValue('hash', hash);
    }

    authenticate(username, password) {
        // hash and compare and return boolean
    }
}

Users.init(
    {
        first_name: {type: DataTypes.STRING, allowNull: false},
        last_name: {type: DataTypes.STRING, allowNull: false},
        dob: {type: DataTypes.DATE, allowNull: false},
        gender: {type: DataTypes.ENUM('Male', 'Female', 'Unknown'), defaultValue: 'Unknown'},
        username: {type: DataTypes.STRING, allowNull: false},
        hash: {type: DataTypes.STRING, allowNull: false},
        salt: {type: DataTypes.STRING, allowNull: false},
        gravatar_id: {type: DataTypes.STRING, allowNull: false},
        gravatar_ext: {type: DataTypes.STRING, allowNull: false},
    }, {
        sequelize,
        modelName: 'users',
        underscored: true,
    }
);

// sequelize.sync()
//     .then(() => Users.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     }))
//     .then(jane => {
//         console.log(jane.toJSON());
//     });

// Export the model in order to use it to query the table
module.exports = Users;