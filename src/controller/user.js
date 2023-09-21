const userModel = require("../models/user");
const constants = require("../config/constants");
const { CustomError } = require("../error/errors");
const alloha = async (req, res, next) => {
  // res.status(500).json({ message: constants.MESSAGES.USER_CREATED });
  return next(CustomError("test", 429)); //use case
};

const register = async (req, res) => {
  try {
  } catch (error) {}
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
