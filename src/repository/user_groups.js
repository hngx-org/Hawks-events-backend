const UserGroup = require('../models/user_groups');

class UserGroupRepository {
   addUserGroup = async (user_id, group_id) => {
      try {
         const newUserGroup = await UserGroup.create({user_id, group_id})
         return JSON.parse(JSON.stringify(newUserGroup))
      } catch (error) {
         return error
      }
   }
}

module.exports = new UserGroupRepository;