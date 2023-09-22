const { DataTypes } = require("sequelize");
const Sequelize = require('../../db/database')

const UserGroup = Sequelize.define("user-groups", {
   user_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   group_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
         notEmpty: true,
      },
   }
});

Sequelize.sync()
  .then(() => {
    console.log("User Group table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
  
module.exports = UserGroup;
