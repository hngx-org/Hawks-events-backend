// const { DataTypes } = require("sequelize");
// const Sequelize = require("../../db/database");
// const { User } = require("./index")

// const Image = Sequelize.define("groups", {
//   id: {
//     primaryKey: true,
//     type: DataTypes.CHAR,
//     allowNull: false,
//   },
//   title: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   isDeleted: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false, // Initially, a group is not deleted
//   },
//   creator_id: {
//     type: DataTypes.CHAR,
//     defaultValue: DataTypes.CHAR,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
// });


// Sequelize.sync()
//   .then(() => {
//     console.log("Group table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });

// module.exports = Group;
