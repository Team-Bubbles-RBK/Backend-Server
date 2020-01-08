const { Model, DataTypes } = require("sequelize");
const sequelize = require("./Index");

class Messages extends Model {
  get message() {
    return this.messageContent;
  }
}

Messages.init(
  {
    messageContent: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: "messages",
    underscored: true
  }
);

// Create table if not exist in the database
// sequelize.sync();

// Export the model in order to use it to query the table
module.exports = Messages;
