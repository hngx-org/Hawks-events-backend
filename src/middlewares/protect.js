const {MESSAGES} = require("../config/constants")
const UserModel = require('../models/user');
const {decryptData} = require('../ultis/jwt')

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
 
  if (!token) {
    return res.status(404).json({message:MESSAGES.INVALID_TOKEN})
  }
 
  
  
  try {
    const user = await decryptData(token);
    req.user = await UserModel.findByPk(user.id);
    next();
  } catch (error) {
    return next(CustomError(MESSAGES.EXPIRED_TOKEN, 401))
  }
};

module.exports = protect