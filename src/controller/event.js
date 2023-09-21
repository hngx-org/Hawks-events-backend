const {NotFoundError, ClientError, CustomError } = require("../error/errors");
const Event = require("../models/events");
const { MESSAGES } = require('../config/constants')

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
    return next(CustomError(MESSAGES.SUCCESSFUL,200))
    // res.status(200).json(events);
  } catch (err) {
return next(CustomError(MESSAGES.INTERNAL_SERVER_ERROR,500))
    // res.status(500).json({});
  }
};

// Get event details by eventId
exports.getEventById = async (req, res, next) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return next(CustomError(MESSAGES.NOT_FOUND,404))
      // return res.status(404).json({});
    }
    return next(CustomError(MESSAGES.SUCCESSFUL,200))
    // res.status(200).json(event);
  } catch (err) {
    return next(CustomError(MESSAGES.INTERNAL_SERVER_ERROR,500))
    // res.status(500).json({});
  }
};


exports.updateEvent = async (req, res,next) => {
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
    return next(CustomError(MESSAGES.NOT_FOUND,404))
    // return res.status(404).json({ error: "Event not found" });

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
  return next("Event updated successfully",200)
  // res.status(200).json({ message: "Event updated successfully" });

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
  console.log(description, location, title, creator_id, start_date, end_date);
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
      return next(CustomError("Invalid event data",400))
      // throw new BadRequestError("Invalid event data");
    }
    return next(CustomError(MESSAGES.CREATED,201))
    // res.status(201).json({ statusCode: 201, message: "event created" });
  } catch (err) {
    return next(CustomError(MESSAGES.INTERNAL_SERVER_ERROR,500))
    // next(err);
  }

};
