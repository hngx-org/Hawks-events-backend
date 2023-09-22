const { DataTypes } = require("sequelize");
const Comment = require('../models/comments')
const Image = require('../models/images')
const Sequelize = require('../../db/database')

const CommentImage = Sequelize.define('CommentImage', {
    comment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Comment,
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Image,
        key: 'id',
      },
    },
  });

CommentImage.belongsTo(Comment, { foreignKey: 'comment_id' });
Comment.hasMany(CommentImage, { foreignKey: 'comment_id' });

CommentImage.belongsTo(Image, { foreignKey: 'image_id' });
Image.hasMany(CommentImage, { foreignKey: 'image_id' });

Sequelize.sync().then(() => {
  console.log("CommentImages table created successfully!");
}).catch((error) => {
  console.error("Unable to create CommentImages table:", error);
});

module.exports = CommentImage;