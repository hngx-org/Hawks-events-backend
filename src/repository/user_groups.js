const { User, Group, UserGroup} = require("../models/index")

class UserGroupRepository {
   addAUserToGroup = async (user_id, group_id) => {
      try {
         await UserGroup.create({user_id, group_id})
         const result = await User.findOne({ 
            where: { id: user_id },
            include: Group
         })
         return JSON.parse(JSON.stringify(result))
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
            attributes: {
               exclude: ["group_id"]
            },
            where: { group_id },
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

   deleteUserGroup = async (user_id, group_id) => {
      try {
         const deletedUsers = await UserGroup.destroy({
            where: { user_id, group_id }
         });
         return deletedUsers;
      } catch (error) {
         return error;
      }
   };

}

module.exports = new UserGroupRepository;