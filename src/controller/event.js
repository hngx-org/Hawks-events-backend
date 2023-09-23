
const { MESSAGES } = require("../config/constants");
const { ServerError } = require("../error/errors");
const {Event} = require("../models/index");


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
      return res.status(404).json({message:MESSAGES.NOT_FOUND});
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
    created_at,
    description,
    location,
    title,
    start_date,
    end_date,
    start_time,
    end_time,
  } = req.body;
  let eventItem;

  try {
    eventItem = await Event.create({
      description,
      created_at,
      title,
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
