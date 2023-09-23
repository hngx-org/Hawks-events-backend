const {
  ServerError,
  NotFoundError,
  BadRequestError,
} = require("../error/errors");
const { MESSAGES } = require("../config/constants");
const Event = require("../models/events");
const { MESSAGES } = require("../config/constants");

/// BAD REQUEST ERROR DOES NOT EXIST! STOP USING IT

// HERE IS HOW TO USE THE ERROR

//return next(CustomError(message,200))  - THIS IS TO CREATE A CUSTOM

// throw new NotFoundError(MESSAGE) - THIS HOW TO USE THE RIGHT HARDCODED ERROR

// Get all events
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll();

    // if(!events){
    // HANDLE SUCH CASES
    // }
    res.status(200).json(events);
  } catch (err) {
    throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
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
    throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
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
    return res.status(404).json({ error: MESSAGES.NOT_FOUND });
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
  res.status(200).json({ message: MESSAGES.EVENT_UPDATED });
};

//post events

exports.postEvent = async (req, res, next) => {
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
  let eventItem;

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
      throw new BadRequestError("Invalid event data");
    }

    res.status(201).json({ statusCode: 201, message: MESSAGES.EVENT_CREATED });
  } catch (err) {
    next(err);
  }
};

//delete event
exports.deleteEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: MESSAGES.NOT_FOUND });
    }

    await event.destroy();
    res.status(200).json({ message: MESSAGES.EVENT_DELETED });
  } catch (err) {
    throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};
