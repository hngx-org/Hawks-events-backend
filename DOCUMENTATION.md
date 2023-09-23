##Overview
This repository contains the code for a REST API built using Nodejs, Express, Sequelize, Mysql2. The API is designed to allow its users to signup on an event app, create an event, view events created and also update event created. The code is well-written and easy to understand, so even if you're not an expert in programming, you should be able to navigate it without any problems.

##TechStack
Node.js: Node.js is a cross-platform, open-source server environment that runs JavaScript outside the browser.
Express: Express.js is a popular open-source Node.js framework for building web applications and APIs.

Sequelize: Sequelize is a modern TypeScript and Node.js ORM for MySQL SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.

##Features
All the crud operations both users and event functionality
Proper Error checking
Input Validation
Database connection implementation.
Usage
Base URL
The base URL for all API requests is: http://localhost:8080/api/events

## USER REGISTRATION
This section provides an understanding of the register and profile functions and their usage in this nodejs application.
Prerequisites
Before you begin, make sure you have the following prerequisites in place:

Node.js and npm installed on your system.
You will use the following to collect users data: name, image and an avarter.
####Configure user.js with Auth0 and Google strategy using the provided code snippet.

```javascript

const { ServerError, NotFoundError } = require("../error/errors");
const { CustomError } = require("../error/errors");
const { MESSAGES } = require("../config/constants");
const { createJwt } = require("../ultis/jwt");
const { User } = require("../models/index");


const register = async (req, res, next) => {
  const requestBody = req.body || {};
  const userData = {
    id: requestBody.id || null,
    name: requestBody.name || null,
    email: requestBody.email || null,
    avatar: requestBody.avatar || null,
  };

  const requiredFields = ["id", "email", "name", "avatar"];



  for (const field of requiredFields) {
    if (!userData[field]) {
      res.status(400).json({ error: `Missing ${field}` });
      return;
    }
  }

  try {
    User.findOrCreate({
      where: { id: userData.id, email: userData.email },
      defaults: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
      },
    })
      .then(async (data) => {
        const token = await createJwt({
          id: userData.id,
          email: userData.email,
        });
        res.status(201).json({
          statusCode: 201,
          message: MESSAGES.USER_CREATED,
          data,
          token,
        });
      })
      .catch((error) => {
        throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
        return next(CustomError(error.message, 500));
      });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

module.exports = {
  register
};
```

#### Profile
Update the user profile with the information provided in the above code

```javascript
const profile = async (req, res, next) => {
  try {
    const user = await userModel.findByPk(req.user.dataValues.id);
    if (!user) {

      return next(CustomError(MESSAGES.USER_NOT_EXIST, 404));

    }
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};


module.exports = {
 profile
};
```


## AUTHETICATION

Auth0 Integration with Passport.js
Prerequisites
Before you begin, make sure you have the following prerequisites in place:

Node.js and npm installed on your system.
An Auth0 account. You can sign up for a free account [here](https://auth0.com/signup)
Google Developer Console project with OAuth 2.0 credentials.

####Configure Passport.js with Auth0 and Google strategy using the provided code snippet.

```javascript
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../config/constants");

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

module.exports = passport;
```

Update the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET constants in your application with the credentials obtained in step 1.

Usage
Initialize Passport.js in your Express application

```javascript
const passport = require("./src/authentication/passport");
const session = require("express-session");
const express = require("express");
const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());
```

##Create Route For Authetification

```javascript
const router = require("express").Router();
const passport = require("../authentication/passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    // Successful authentication,
    const user = req.user;
    res.status(200).json({ message: "success" });
  }
);

module.exports = router;
```
##Events Controller

Endpoints

1. Get All Events
   Endpoint: /
   Method: GET
   Description: Retrieves a list of all events.
   Request:
   No request parameters are required.
   Response:
   Status Code: 200 OK
   Response Body: An array of event objects.

Example Request:

```javascript
GET http://localhost:8080/api/events
```

Example Response:

```javascript
[
  {
    id: "23873d15-cde3-442f-8045-819156d3f4ee",
    title: "team hawks",
    description: "team hawks",
    creator_id: "chinedu",
    location: "Nigeria",
    start_date: "1995-01-01",
    end_date: "1996-02-05",
    start_time: "14:55:55",
    end_time: "15:55:55",
    thumbnail: "hello.jpeg",
    createdAt: "2023-09-21T02:28:33.000Z",
    updatedAt: "2023-09-21T02:28:33.000Z",
  },
  {
    id: "760902c7-3e15-4a42-becb-b55f821feefa",
    title: "Sample Event",
    description: "This is a sample event description.",
    creator_id: "12345",
    location: "Sample Location",
    start_date: "2023-09-25",
    end_date: "2023-09-26",
    start_time: "00:11:11",
    end_time: "00:11:11",
    thumbnail: "testing",
    createdAt: "2023-09-21T07:14:49.000Z",
    updatedAt: "2023-09-21T07:14:49.000Z",
  },
];
```

2. Get Event by ID
   Endpoint: /events/:eventId
   Method: GET
   Description: Retrieves event details by event ID.
   Request:
   Path Parameters:
   eventId (required): The ID of the event to retrieve.
   Response:
   Status Code: 200 OK (if the event is found)
   Status Code: 404 Not Found (if the event is not found)
   Response Body: The event object.

Example Request:

```javascript
GET http://localhost:8080/api/events/:eventId
```

Example Response:

```javascript
[
  {
    id: "760902c7-3e15-4a42-becb-b55f821feefa",
    title: "Sample Event",
    description: "This is a sample event description.",
    creator_id: "12345",
    location: "Sample Location",
    start_date: "2023-09-25",
    end_date: "2023-09-26",
    start_time: "00:11:11",
    end_time: "00:11:11",
    thumbnail: "testing",
    createdAt: "2023-09-21T07:14:49.000Z",
    updatedAt: "2023-09-21T07:14:49.000Z",
  },
];
```

3. Update Event
   Endpoint: /events/:eventId
   Method: PUT
   Description: Updates event details by event ID.
   Request:
   Path Parameters:
   eventId (required): The ID of the event to update.
   Request Body: JSON object with updated event properties (e.g., title, description).
   Response:
   Status Code: 200 OK (if the event is updated successfully)
   Status Code: 404 Not Found (if the event is not found)
   Response Body: A success message.

Example Request:

```javascript
PUT http://localhost:8080/api/events/:eventId
```

payload

```javascript

{
    "id": "760902c7-3e15-4a42-becb-b55f821feefa",
    "title": "Sample Event",
    "description": "This is request have been updated.",
    "creator_id": "123456",
    "location": "Delta Location",
    "start_date": "2023-09-25",
    "end_date": "2023-09-26",
    "start_time": "00:11:11",
    "end_time": "00:11:11",
    "thumbnail": "testing",
    "createdAt": "2023-09-21T07:14:49.000Z",
    "updatedAt": "2023-09-21T07:14:49.000Z"
}

```

Example Response

```javascript
{
    "message": "Event updated successfully"
}
```

4. Create Event
   Endpoint: /
   Method: POST
   Description: Creates a new event.
   Request:
   Request Body: JSON object with event properties (e.g., title, description).
   Response:
   Status Code: 201 Created (if the event is created successfully)
   Status Code: 400 Bad Request (if the request data is invalid)
   Response Body: A success message.

Example Request:

```javascript
POST http://localhost:8080/api/events
```

PayLoad

```javascript

{
    "title": "Sample Event",
    "description": "This is request have been created.",
    "creator_id": "123456",
    "location": "Delta Location",
    "start_date": "2023-09-25",
    "end_date": "2023-09-26",
    "start_time": "00:11:11",
    "end_time": "00:11:11",
    "thumbnail": "testing",
    "createdAt": "2023-09-21T07:14:49.000Z",
    "updatedAt": "2023-09-21T07:14:49.000Z"
}

```

Example Response:

```javascript
{
    "statusCode": 201,
    "message": "event created"
}
```

##Errors
This API uses the following error codes:

- 400 Bad Request: The request was malformed or missing required parameters.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.
