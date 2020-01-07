const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Index");

class Messages extends Model {
  get message() {
    return this.messageContent;
  }
}

Messages.init(
  {
    userID: this.user.id,
    messageContent: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: "messages",
    underscored: true
  }
);

// Export the model in order to use it to query the table
module.exports = Messages;
