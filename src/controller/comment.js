const { Comment } = require("../models/index");
const { Op } = require("sequelize");
// Import your Sequelize models

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { body, user_id, event_id } = req.body;

    // Create the comment in the database using the Comment model
    const newComment = await Comment.create({ body, user_id, event_id });

    // Respond with the newly created comment
    res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

module.exports = {
  createComment,
  //   likeComment,
  //   dislikeComments,
};
