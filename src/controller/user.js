const { uuid } = require('uuidv4')
const { ServerError, NotFoundError } = require("../error/errors");
const { CustomError } = require("../error/errors");
const { MESSAGES } = require("../config/constants");
const { createJwt } = require("../ultis/jwt");
const { User } = require("../models/index");

const register = async (req, res, next) => {
  const id = uuid()
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

  try {
    User.findOrCreate({
      where: { id, email: userData.email },
      defaults: {
        id: uuid(),
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

const profile = async (req, res, next) => {
  try {
    console.log(req.id)
    console.log(req.user.dataValues.id)
    const user = await User.findByPk(req.user.dataValues.id);
    if (!user) {
      return next(CustomError(MESSAGES.USER_NOT_EXIST, 404));
    }
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  profile,
};
