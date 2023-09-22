const { DataTypes } = require("sequelize");
const Sequelize = require('../../db/database'); // Import your Sequelize instance

const Image = Sequelize.define('Image', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
  }
});

Sequelize.sync().then(() => {
  console.log("Images table created successfully!");
}).catch((error) => {
  console.error("Unable to create Images table:", error);
});

module.exports = Image;