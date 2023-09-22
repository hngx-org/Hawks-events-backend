const { DataTypes } = require("sequelize");
const User = require('../models/user');
const Event = require('../models/events')
const Sequelize = require('../../db/database')

const Comment = Sequelize.define('Comment', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    
  });
  
  //Define the relationships
  Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  User.hasMany(Comment, { foreignKey: 'userId' });
  
  Comment.belongsTo(Event, { foreignKey: 'eventId', onDelete: 'CASCADE' });
  Event.hasMany(Comment, { foreignKey: 'eventId' });
  
 
Sequelize.sync().then(() => {
    console.log("Comments created successfully!");
  }).catch((error) => {
    console.error("Unable to create Comment table : ", error);
  });
  
module.exports = Comment;