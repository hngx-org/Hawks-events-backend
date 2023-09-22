const { DataTypes } = require("sequelize");
const Sequelize = require("../../db/database");

const user = Sequelize.define("users", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true,
    validate: {
      notEmpty: true,
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
});

Sequelize.sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = user;
