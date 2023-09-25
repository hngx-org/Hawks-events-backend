const { ServerError, NotFoundError } = require("../error/errors");
const { CustomError } = require("../error/errors");
const { MESSAGES } = require("../config/constants");
const { createJwt } = require("../ultis/jwt");
const { User } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

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
    name: requestBody.name || null,
    email: requestBody.email || null,
    avatar: requestBody.avatar || null,
  };
  const requiredFields = ["email", "name", "avatar"];
  for (const field of requiredFields) {
    if (!userData[field]) {
      return res.status(400).json({ error: `Missing ${field}` });
    }
  }
  try {
    // Generate a unique ID (UUID) for the user
    const id = uuidv4(); // Generate a UUID
    const [user, created] = await User.findOrCreate({
      where: { email: userData.email },
      defaults: {
        id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
      },
    });
    if (created) {
      const token = await createJwt({
        id,
        email: userData.email,
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
  profile,
};
