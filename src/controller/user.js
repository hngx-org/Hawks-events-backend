const { ServerError, NotFoundError } = require("../error/errors");
const { CustomError } = require("../error/errors");
// <<<<<<< Team-F
// const {MESSAGES} = require('../config/constants')
// const {createJwt} = require('../ultis/jwt')
// const userModel = require('../models/user')
// const { v4: uuidv4 } = require('uuid');
// =======
// const { MESSAGES } = require("../config/constants");
// const { createJwt } = require("../ultis/jwt");
// const { User } = require("../models/index");
// const { v4: uuidv4 } = require("uuid");
// >>>>>>> main

// const register = async (req, res, next) => {
//   const requestBody = req.body || {};
//   const userData = {
//     id: requestBody.id || null,
//     name: requestBody.name || null,
//     email: requestBody.email || null,
//     avatar: requestBody.avatar || null,
//   };

//   const requiredFields = ["id", "email", "name", "avatar"];

//   for (const field of requiredFields) {
//     if (!userData[field]) {
//       res.status(400).json({ error: `Missing ${field}` });
//       return;
//     }
//   }

//   try {
//     User.findOrCreate({
//       where: { id: userData.id, email: userData.email },
//       defaults: {
//         id: userData.id,
//         name: userData.name,
//         email: userData.email,
//         avatar: userData.avatar,
//       },
//     })
//       .then(async (data) => {
//         const token = await createJwt({
//           id: userData.id,
//           email: userData.email,
//         });
//         res.status(201).json({
//           statusCode: 201,
//           message: MESSAGES.USER_CREATED,
//           data,
//           token,
//         });
//       })
//       .catch((error) => {
//         throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
//         return next(CustomError(error.message, 500));
//       });
//   } catch (error) {
//     console.log(error);
//     next(err);
//   }
// };
const register = async (req, res, next) => {
  const requestBody = req.body || {};
  const userData = {
// <<<<<<< Team-F
//     id: uuidv4(),
// =======
// >>>>>>> main
    name: requestBody.name || null,
    email: requestBody.email || null,
    avatar: requestBody.avatar || null,
  };
// <<<<<<< Team-F

//   const requiredFields = [ "id", "email", "name", "avatar" ];

// =======
//   const requiredFields = ["email", "name", "avatar"];
// >>>>>>> main
  for (const field of requiredFields) {
    if (!userData[field]) {
      return res.status(400).json({ error: `Missing ${field}` });
    }
  }
  try {
// <<<<<<< Team-F
//     userModel
//       .findOrCreate({
//         where: { id:userData.id, email: userData.email },
//         defaults: {
//           id: userData.id,
//           name: userData.name,
//           email: userData.email,
//           avatar: userData.avatar,
//         },
//       })
//       .then(async (data) => {
//         const token = await createJwt({ id: userData.id, email: userData.email })
//         res.status(201).json({ statusCode: 201, message: MESSAGES.USER_CREATED, data, token });
//       })
//       .catch((error) => {
//         return next(CustomError(error.message, 500))
// =======
//     // Generate a unique ID (UUID) for the user
//     const id = uuidv4(); // Generate a UUID
//     const [user, created] = await User.findOrCreate({
//       where: { email: userData.email },
//       defaults: {
//         id,
//         name: userData.name,
//         email: userData.email,
//         avatar: userData.avatar,
//       },
//     });
//     if (created) {
//       const token = await createJwt({
//         id,
//         email: userData.email,
// >>>>>>> main
      });
      return res.status(201).json({
        statusCode: 201,
        message: MESSAGES.USER_CREATED,
        data: user,
        token,
      });
    } else {
      return res.status(409).json({ error: "User already exists" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const profile = async (req, res, next) => {
  try {
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
// <<<<<<< Team-F
//   profile
// };
// =======
//   profile,
// };
// >>>>>>> main
