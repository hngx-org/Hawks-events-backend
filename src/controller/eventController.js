const constants = require("../config/constants");
const BadRequestError = require("../error/errors");
const Event = require("../models/events");
const {MESSAGES} = require('../config/constants')


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
      return res.status(404).json({ error: constants.MESSAGE.EVENT_NOT_FOUND });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: constants.MESSAGE.EVENT_LIST });
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
  res.status(200).json({ message: "Event updated successfully" });
};

// Get a list of all events
exports.getEvents = async (req, res) => {
  try {
    //Fetch all data usind sequelize from the DB
    const events = await Event.findAll();
    //Event Response
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: constants.MESSAGE.EVENT_LIST });
  }
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


    if (!eventItem) {
      throw new BadRequestError(MESSAGES.MISSING_FIELDS);
    }
    res.status(201).json({ statusCode: 201, message: MESSAGES.EVENT_CREATED });
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  // Check if the event exists
  const existingEvent = await Event.findByPk(eventId);

  if (!existingEvent) {
    return res.status(404).json({ error: "Event not found" });
  }

  // Delete event using Sequelize
  await existingEvent.destroy();
  res.status(200).json({ message: "Event deleted successfully" });
};
