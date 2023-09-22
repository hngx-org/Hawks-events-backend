const Comment = require('../models/comments')
const Like = require('../models/likes')
const { Op } = require('sequelize');
// Import your Sequelize models

const likeComment = async(req, res) => {
    const {commentId} = req.params
    //const userId = req.user.id
    const { userId } = req.body;

    const newLike = await Like.create({
        user_id: userId,
        comment_id: commentId,
    });
    res.status(201).json(newLike);
}

module.exports = {
    likeComment
};