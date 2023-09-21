const userModel = require('../models/user');
const constants = require('../config/constants');
const { CustomError } = require('../error/errors');
const Sequelize = require('../../db/database');
const user = require('../models/user');
const alloha = async (req, res, next) => {
  // res.status(500).json({ message: constants.MESSAGES.USER_CREATED });
  return next(CustomError('test', 429)); //use case
};

const register = async (req, res) => {
  try {
    const { email, name } = req.body;

    // CHECK WHETHER THE USER EXIST

    const existingUser = await user.findOne({ where: { email } });
    // IF USER ALREADY EXIST, THROW AN ERROR

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User with the same name or email already exists.' });
    }

    // Create a new user in the database
    const newUser = await user.create({
      email,
      name,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {};

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
