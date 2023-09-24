const { Comment } = require("../models/index");
const { Op } = require("sequelize");
// Import your Sequelize models

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { body, event_id, user_id } = req.body;

    // Create the comment in the database using the Comment model
    const newComment = await Comment.create({ body, event_id, user_id });

    // Respond with the newly created comment
    res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const events = await Comment.findAll();
    
    // if(!events){
      // HANDLE SUCH CASES 
    // }
    res.status(200).json(events);
  } catch (err) {
    throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};


module.exports = {
  createComment,
  getAllComments
  //   likeComment,
  //   dislikeComments,
};
