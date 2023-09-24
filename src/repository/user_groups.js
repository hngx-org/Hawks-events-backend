const { UserGroup} = require("../models/index")

class UserGroupRepository {
   addAUserToGroup = async (user_id, group_id) => {
      try {
         const newUserGroup = await UserGroup.create({user_id, group_id})
         return JSON.parse(JSON.stringify(newUserGroup))
      } catch (error) {
         throw error
      }
   }

   findAMember = async (user_id, group_id) => {
      try {
         const isMember = await UserGroup.findOne({
            where: { user_id, group_id }
         })
         return isMember ? true : false
      } catch (error) {
         throw error
      }
   }

   findAllMembers = async (group_id) => {
      try {
         const members = await UserGroup.findAll({
            where: { group_id }
         })
         return JSON.parse(JSON.stringify(members))
      } catch (error) {
         throw error
      }
   }

   findByPk = async(group_id) => {
      try {
         const users = await UserGroup.findOne({
            where: group_id
         })
         return JSON.parse(JSON.stringify(users))
      } catch (error) {
         throw error
      }
   }
      
   removeAmemberFromGroup = async (user_id, group_id) => {
      try {
         const response = await UserGroup.destroy({
            where: { user_id, group_id } 
         })
         return response
      } catch (error) {
         throw error
      }
   }

}

module.exports = new UserGroupRepository;