const express = require("express");
const router = express.Router();
const eventController = require("../controller/event");
const protect = require("../middlewares/protect");

// use case
// router.get("/", protect, eventController.createEvent) => ALL ROUTES HERE SHOULD HAVE THIS!

// Define routes and link them to controller functions
router
  .get("/", protect, eventController.getAllEvents)
  .get("/:eventId", eventController.getEventById);

// PUT /api/events/:eventId - Update event details
router.put("/:eventId", eventController.updateEvent);

// POST /api/events/ route
router.post("/", eventController.postEvent);

// DELETE /api/events/ route
router.delete("/", eventController.deleteEvent);

module.exports = router;
