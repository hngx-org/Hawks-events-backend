// const { DataTypes } = require("sequelize");
// const Sequelize = require('../../db/database')

// const Event = Sequelize.define('Event', {
//   id: {
//     primaryKey: true,
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//  },
//   title: {
//     type: DataTypes.STRING(60),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING(1024),
//     allowNull: false,
//   },
//   creator_id: {
//     type: DataTypes.STRING(60),
//     allowNull: false,
//   },
//   location: {
//     type: DataTypes.STRING(1024),
//     allowNull: false,
//   },
//   start_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   end_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   start_time: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   end_time: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   thumbnail: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//     comment: 'Url to the thumbnail',
//   },
// });

// Sequelize.sync()
//   .then(() => {
//     console.log("Events table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create event table : ", error);
//   });

// module.exports = Event;
