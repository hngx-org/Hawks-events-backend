const { DataTypes } = require("sequelize");
const Sequelize = require('../../db/database'); // Import your Sequelize instance
const Comment = require('../models/comments'); // Make sure to import your Comment model
const User = require('../models/user');

const Like = Sequelize.define('likes', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    comment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Comment,
        key: 'id',
      },
    },
  }, {
    timestamps: false, // To disable Sequelize from adding 'createdAt' and 'updatedAt' columns
  });

// Define the relationships
Like.belongsTo(Comment, { foreignKey: 'comment_id' });
Comment.hasMany(Like, { foreignKey: 'comment_id' });

Like.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Like, { foreignKey: 'user_id' });

Sequelize.sync().then(() => {
  console.log("Likes table created successfully!");
}).catch((error) => {
  console.error("Unable to create Likes table:", error);
});

module.exports = Like;