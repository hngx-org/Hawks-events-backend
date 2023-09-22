const express = require('express');
const router = express.Router();
const eventController = require('../controller/comment');
const protect = require('../middlewares/protect')


// use case 
// router.get("/", protect, eventController.createEvent) => ALL ROUTES HERE SHOULD HAVE THIS!
router.post("/commentId/like", protect, eventController.likeComment )


module.exports = router