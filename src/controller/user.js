const userModel = require("../models/user");
const constants = require("../config/constants");
const { CustomError } = require("../error/errors");
const alloha = async (req, res, next) => {
  // res.status(500).json({ message: constants.MESSAGES.USER_CREATED });
  return next(CustomError("test", 429)); //use case
};

const register = async (req, res, next) => {
  const requestBody = req.body || {};
  const userData = {
    name: requestBody.name || null,
    email: requestBody.email || null,
    avatar: requestBody.avatar || null,
  };

  const requiredFields = ["email", "name", "avatar"];

  for (const field of requiredFields) {
    if (!userData[field]) {
      res.status(400).json({ error: `Missing ${field}` });
      return;
    }
  }
  let User;
  let created;

  try {
    userModel
      .findOrCreate({
        where: { email: userData.email },
        defaults: {
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
        },
      })
      .then((data) => {
        res.status(201).json({ statusCode: 201, message: "user created" });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        throw new BadRequestError("Invalid user data");
      });
  } catch (error) {
    next(err);
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

const profile = async (req, res) => {
  try {
  } catch (error) {}
};

const updateProfile = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  alloha,
  register,
  login,
  profile,
};
