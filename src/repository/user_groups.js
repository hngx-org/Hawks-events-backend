const {UserGroup} = require('../models/index');

class UserGroupRepository {
   addUserGroup = async (user_id, group_id) => {
      try {
         const newUserGroup = await UserGroup.create({user_id, group_id})
         return JSON.parse(JSON.stringify(newUserGroup))
      } catch (error) {
         return error
      }
   }

   findMember = async (user_id, group_id) => {
      try {
         const isMember = await UserGroup.findOne({
            where: { user_id, group_id }
         })
         return isMember ? true : false
      } catch (error) {
         return error
      }
   }
      
   removeAmemberFromGroup = async (user_id, group_id) => {
      try {
         const response = await UserGroup.destroy({
            where: { user_id, group_id } 
         })
         return response
      } catch (error) {
         return error
      }
   }

}

module.exports = new UserGroupRepository;