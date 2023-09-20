const { NODE_ENV } = require('../config/constants');

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const statusCode = res?.statusCode === 200 ? 500 : res?.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV ? null : err.stack,
  });
};

module.exports = errorHandler;
