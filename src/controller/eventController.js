const {internalServerError} = require("../error/errors");
const Event = require("../models/events");
const {MESSAGES} = require('../config/constants')
const constants = require("../config/constants.js")

// Get all events
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({});
  }
};

// Get event details by eventId
exports.getEventById = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({});
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({});
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const {
    title,
    description,
    location,
    start_date,
    end_date,
    start_time,
    end_time,
    thumbnail,
  } = req.body;

  // Check if the event exists
  const existingEvent = await Event.findByPk(eventId);

  if (!existingEvent) {
    return res.status(404).json({ error: "Event not found" });
  }

  // Update event details using Sequelize
  existingEvent.title = title;
  existingEvent.description = description;
  existingEvent.location = location;
  existingEvent.start_date = start_date;
  existingEvent.end_date = end_date;
  existingEvent.start_time = start_time;
  existingEvent.end_time = end_time;
  existingEvent.thumbnail = thumbnail;

  await existingEvent.save();
  res.status(200).json({ message:constants.MESSAGE.EVENT_UPDATED });
};

//post events

exports.postEvent = async (req, res, next) => {
  
  let eventItem;
  const {
    thumbnail,
    description,
    location,
    title,
    creator_id,
    start_date,
    end_date,
    start_time,
    end_time,
  } = req.body;
 
  try {
    eventItem = await Event.create({
      thumbnail,
      description,
      title,
      creator_id,
      start_date,
      end_date,
      start_time,
      end_time,
      location,
    });


  
    res.status(201).json({ statusCode: 201, message: MESSAGES.EVENT_CREATED });
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  // Check if the event exists
  try{

    const existingEvent = await Event.findByPk(eventId);
  
    if (!existingEvent) {
      return res.status(404).json({ error: MESSAGES.NOT_FOUND });
    }
  
    // Delete event using Sequelize
    await existingEvent.destroy();
    res.status(200).json({ message: MESSAGES.DELETED });
  }catch(err){
    throw new internalServerError(MESSAGES.SERVER_ERROR)
  }
};
