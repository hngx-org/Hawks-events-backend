const {addGroup} = require('../repository/group');
const { addUserGroup, findMember } = require('../repository/user_groups');


class GroupController {

   createGroup = async(req, res) => {
      try {
         const { title } = req.body; 
         const group = await addGroup(title)
         console.log(req.user.id)
         await addUserGroup(req.user.id, group.id)
         return res.status(201).json({message: "New group created", group})
      } catch (error) {
         return res.status(500).json({
            message: "Error creating group",
            error: error.message
         })
      }
   }

   addUserToGroup = async(req, res) => {
      try {
         // Check if user is in group already
         const isAMember = await findMember(req.params.userId, req.params.groupId)
         if (isAMember) {
            return res.status(400).json({message: "User is already a member"})
         }

         // Add user to group
         await addUserGroup(req.params.userId, req.params.groupId)
         return res.status(201).json({message: "New user added"})
      } catch (error) {
         return res.status(500).json({
            message: "Error adding user to group",
            error: error.message
         })
      }
   }

   removeUserFromGroup = async(req, res) => {
      try {
         // Check if user is in group

         // Remove user from group
      } catch (error) {
         return res.status(500).json({
            message: "Error removing user from group",
            error: error.message
         })
      }
   }

}

module.exports = new GroupController;