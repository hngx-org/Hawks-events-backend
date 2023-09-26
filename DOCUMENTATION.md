## Overview
This repository contains the code for a REST API built using Nodejs, Express, Sequelize, Mysql2. The API is designed to allow its users to signup on an event app, create an event, view events created and also update event created. The code is well-written and easy to understand, so even if you're not an expert in programming, you should be able to navigate it without any problems.

##TechStack
Node.js: Node.js is a cross-platform, open-source server environment that runs JavaScript outside the browser.
Express: Express.js is a popular open-source Node.js framework for building web applications and APIs.

Sequelize: Sequelize is a modern TypeScript and Node.js ORM for MySQL SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.

## Features

- All the crud operations both users and event functionality
- Proper Error checking
- Input Validation
- Database connection implementation.
- Usage
- Base URL
- The base URL for all API requests is: http://localhost:8080/api/events


## USER REGISTRATION

##### Create USER
   Endpoint: /users/register
   Method: POST
   Description: Creates a new user.
   Request:
   Request Body: JSON object with user properties (e.g. name, email and Image).
   Response:
   Status Code: 201 Created (if the user is created successfully)
   Status Code: 400 Bad Request (if the request data is invalid)
   Response Body: A success message.
   
Example Request:

```javascript
POST http://localhost:8080/api/users/register
```

PayLoad

```javascript
{
     "id":"550e8122-e29b-41d4-a716-446655440000",
    "name":"John Swan",
    "email":"JohnSwb@gmail.com",
    "avatar":"https://lh3.googleusercontent.com/a/ACg8ocLMMaDCAR74N60sNXV16VubfW9xtPniRB4DB06d3nIJEg=s317-c-no"
}
```

Example Response:

```javascript
{
    "statusCode": 201,
    "message": "User created successfully",
    "data": [
        {
            "id": "550e8122-e29b-41d4-a716-446655440000",
            "name": "John Swan",
            "email": "JohnSwb@gmail.com",
            "avatar": "https://lh3.googleusercontent.com/a/ACg8ocLMMaDCAR74N60sNXV16VubfW9xtPniRB4DB06d3nIJEg=s317-c-no"
        },
        true
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4MTIyLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImVtYWlsIjoiSm9oblN3YkBnbWFpbC5jb20iLCJpYXQiOjE2OTU0NzA4ODAsImV4cCI6MTY5NTU1NzI4MH0.lwfFlyPjViYhbU9aslzy9GPSq2eRlTs2IsDkmb_eq3o"
}
```

## GET USER PROFILE

Get User by Token
   Endpoint: /users/profile/token
   Method: GET
   Description: Retrieves user details by auth token.
   Request:
   Path Parameters:
   token (required): The token of the user to retrieve.
   Response:
   Status Code: 200 OK (if the event is found)
   Status Code: 404 Not Found (if the event is not found)
   Response Body: The event object.

Example Request:

```javascript
GET http://localhost:8080/api/users/profile/token
```

Example Response:

```javascript
{
    "user": {
        "id": "550e8122-e29b-41d4-a716-446655440000",
        "name": "John Swan",
        "email": "JohnSwb@gmail.com",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocLMMaDCAR74N60sNXV16VubfW9xtPniRB4DB06d3nIJEg=s317-c-no"
    }
}
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

## Errors

This API uses the following error codes:

- 400 Bad Request: The request was malformed or missing required parameters.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.
