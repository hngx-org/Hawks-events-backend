const { CustomError } = require("../error/errors");
const {MESSAGES} = require('../config/constants')
const {createJwt} = require('../ultis/jwt')
const userModel = require('../models/user')


const register = async (req, res, next) => {
  const requestBody = req.body || {};
  const userData = {
    id:requestBody.id || null,
    name: requestBody.name || null,
    email: requestBody.email || null,
    avatar: requestBody.avatar || null,
  };

  const requiredFields = ["id","email", "name", "avatar"];

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
        where: { id:userData.id, email: userData.email },
        defaults: {
          id:userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
        },
      })
      .then(async (data) => {
        const token = await createJwt({ id: userData.id, email: userData.email })
        res.status(201).json({ statusCode: 201, message: MESSAGES.USER_CREATED, data, token });
      })
      .catch((error) => {
        return next(CustomError(error.message, 500))
      });
  } catch (error) {
    next(err);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await userModel.findByPk(req.user.dataValues.id)
    if(!user){
      return next(CustomError(MESSAGES.USER_NOT_EXIST, 404))
    }
    return res.status(200).json({user})
  } catch (error) {
    next(error)
  }
};

module.exports = {
  register,
  profile
};
