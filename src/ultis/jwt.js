const jwt = require('jsonwebtoken');

const {JWT_PUBLIC_KEY, JWT_USER_LOGIN_EXPIRATION} = require('../config/constants')

const createJwt = async (payload, expTime = JWT_USER_LOGIN_EXPIRATION, secretKey = JWT_PUBLIC_KEY) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: expTime });
  return token;
};

const decryptData = async (token, secretKey = JWT_PUBLIC_KEY) => {
  const data = await jwt.verify(token, secretKey);
  return data;
};

module.exports = {
  createJwt, 
  decryptData,
};
