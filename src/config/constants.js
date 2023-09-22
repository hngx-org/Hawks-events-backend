const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../config.env") });

const constants = {
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_SERVER: process.env.MYSQL_SERVER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DIALECT: process.env.MYSQL_DIALECT,
  MYSQL_DB: process.env.MYSQL_DB,
  APP_NAME: "EVENTS PLANNING APP",
  PORT: process.env.PORT || 5000,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
  JWT_USER_LOGIN_EXPIRATION: '24h',


  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  },

  SEQUELIZE:{
    CONNECTION_SUCCESSFUL:"Connection has been established successfully.",
    CONNECTION_FAILED:"Unable to connect to the database: "
  },
  UPLOAD_PATH: {
    EVENT_IMAGES: "EVENT_IMAGES",
  },

  DB_COLLECTION: {
    USER: "USER",
    EVENT: "EVENT",
    GROUP: "GROUP",
  },

  MESSAGES: {
    EXPIRED_TOKEN:"User expired token",
    USER_EXIST: "User already exists",
    USER_CREATED: "User created successfully",
    USER_LOGGED: "User logged in successfully",
    USER_LOGGED_OUT: "User logged out in successfully",
    USER_UPDATED: "User updated successfully",
    USER_NOT_EXIST: "User does not exist",
    USER_ACTIVITY_GOTTEN: "User activities gotten successfully",
    EVENT_CREATED: "New Event created successfully",
    EVENT_UPDATED: "Event updated successfully",
    UPLOADED: "Upload Successful",
    CONFIRM_EMAIL: "Please confirm email",
    EMAIL_CONFIRMED: "Your email have been confirmed",
    ALREADY_EXIST: "Resource already exists",
    ALREADY_VERIFIED: "User has already been verified",
    CREATED: "Resource created successfully",
    FETCHED: "Resource fetched",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    NOT_FOUND: "Not found",
    SERVER_ERROR:"Internal server error",
    MISSING_FIELDS: "Please fill in the missing fields",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_TOKEN: "Invalid token",
    INVALID_PASSWORD: "Invalid password",
    UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
    BAD_REQUEST: "Bad Request",
    FORBIDDEN: "Forbidden",
    UNPROCESSABLE_ENTITY: "Unprocessable Entity",
    NO_CONTENT: "No Content",
    METHOD_NOT_ALLOWED: "Method Not Allowed",
    LOCKED: "User account is locked",
  },
};

module.exports = constants;
