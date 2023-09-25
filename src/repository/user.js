const { User } = require("../models/index")

class UserRepository {

   findUserById = async(user_id) => {
      try {
         const user = await User.findByPk(user_id)
         return JSON.parse(JSON.stringify(user))
      } catch (error) {
         return error
      }
   }
}

module.exports = new UserRepository;