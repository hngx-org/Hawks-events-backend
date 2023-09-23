const { MESSAGES } = require("../config/constants");
const { UnauthorizedError } = require("../error/errors");
const { User } = require("../models/index");
const { decryptData } = require("../ultis/jwt");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(404).json({ message: MESSAGES.INVALID_TOKEN });
  }

  try {
    const user = await decryptData(token);
    req.user = await User.findByPk(user.id);
    next();
  } catch (error) {
    throw new UnauthorizedError(MESSAGES.EXPIRED_TOKEN);
  }
};

module.exports = protect;
