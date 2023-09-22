const {addGroup} = require('../repository/group');
const { addUserGroup, findMember, removeAmemberFromGroup,  } = require('../repository/user_groups');


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
            return res.status(400).json({message: "This user is already a member of this group"})
         }

         // Add user to group
         await addUserGroup(req.params.userId, req.params.groupId)
         return res.status(201).json({message: "User added to group"})
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
         const isAMember = await findMember(req.params.userId, req.params.groupId)
         if (!isAMember) {
            return res.status(400).json({message: "User not found in group"})
         }

         // Remove user from group
         await removeAmemberFromGroup(req.params.userId, req.params.groupId)
         return res.status(200).json({message: "User removed from group"})
      } catch (error) {
         return res.status(500).json({
            message: "Error removing user from group",
            error: error.message
         })
      }
   }

}

module.exports = new GroupController;