const {Model, DataTypes} = require("sequelize");
const sequelize = require("./index");

class Messages extends Model {
    /***
     *  This function stores a message
     * @param content
     * @param user_id
     * @param bubble_id
     * @returns {Promise<Messages>}
     */
    static store(content, user_id, bubble_id) {
        return this.create({
            content,
            userId: user_id,
            bubbleId: bubble_id
        });
    }
}

Messages.init(
    {
        content: {type: DataTypes.STRING, allowNull: false}
    },
    {
        sequelize,
        modelName: "messages",
        underscored: true
    }
);

// Create table if not exist in the database
sequelize.sync();

// Export the model in order to use it to query the table
module.exports = Messages;
