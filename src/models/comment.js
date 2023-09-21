const { DataTypes } = require("sequelize");
const Sequelize = require('../../db/database')

const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
        type: DataTypes.STRING, 
    },
  });
  
  // Define the relationships
  Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasMany(Comment, { foreignKey: 'userId' });
  
  Comment.belongsTo(Event, { foreignKey: 'eventId', onDelete: 'CASCADE' });
  Event.hasMany(Comment, { foreignKey: 'eventId' });
  
 
  Sequelize.sync()
  .then(() => {
    console.log("Comments created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create Comment table : ", error);
  });
  
module.exports = Comment;