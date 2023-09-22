/* eslint-disable no-unused-vars */
const { CustomAPIErrorHandler } = require("../error/errors");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIErrorHandler) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = errorHandler;
