
const userModel = require('../models/user');
const constants = require('../config/constants');
const { CustomError } = require("../error/errors");
const {MESSAGES} = require('../config/constants')
const {createJwt} = require('../ultis/jwt')
const alloha = async (req, res, next) => {
  // res.status(500).json({ message: constants.MESSAGES.USER_CREATED });
  return next(CustomError('test', 429)); //use case
};


const register = async (req, res, next) => {
  const requestBody = req.body || {};
  const userData = {
    id:requestBody.id || null,
    name: requestBody.name || null,
    email: requestBody.email || null,
    avatar: requestBody.avatar || null,
  };


  const requiredFields = ['email', 'name', 'avatar'];
  const email = userData?.email;
  const existingUser = await userModel.findOne({ where: { email } });
  // IF USER ALREADY EXIST, THROW AN ERROR
  

  if (existingUser) {
    return res
      .status(400)
      .json({ error: 'User with the same name or email already exists.' });
  }
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

      .then((data) => {
        res.status(201).json({ statusCode: 201, message: 'user created' });
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        throw new BadRequestError('Invalid user data');
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


const login = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ where: { email } });

    if (!existingUser) {
      return res

        .status(201)
        .json({ statusCode: 404, message: 'User Not Found' });
    }

    res
      .status(201)
      .json({ statusCode: 201, message: 'Logged In successfully' });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: 'Failed to Login' });
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
