const {SEQUELIZE} = require("../src/config/constants")

const { Sequelize } = require("sequelize");
const {
  MYSQL_SERVER, 
  MYSQL_DIALECT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD
  
} = require("../src/config/constants")


const sequelize = new Sequelize(
  MYSQL_DB, 
  MYSQL_USER, 
  MYSQL_PASSWORD, {
    host: MYSQL_SERVER,
    dialect: MYSQL_DIALECT,
  });



sequelize.authenticate()
    .then(() => {
      console.log(SEQUELIZE.CONNECTION_SUCCESSFUL);
    })
    .catch((error) => {
      console.error(SEQUELIZE.CONNECTION_FAILED, error);
});

module.exports = sequelize
