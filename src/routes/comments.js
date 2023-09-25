const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment");
const protect = require("../middlewares/protect");

// use case
// router.get("/", protect, eventController.createEvent) => ALL ROUTES HERE SHOULD HAVE THIS!

router.post("/", commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/event/:event_id", commentController.getAllCommentsByEventId);
router.get("/user/:user_id", commentController.getAllCommentsByUserId);

module.exports = router;
