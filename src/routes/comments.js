const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment");
const protect = require("../middlewares/protect");

// use case
// router.get("/", protect, eventController.createEvent) => ALL ROUTES HERE SHOULD HAVE THIS!

router.post("/", commentController.createComment);

module.exports = router;
