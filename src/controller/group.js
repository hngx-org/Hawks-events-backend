const { addGroup, updateGroup, deleteGroup} = require('../repository/group')
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
   };

   // Update group details route handler
   updateGroup = async (req, res) => {
      try {
         const { groupId } = req.params;
         const { title } = req.body;

         const updatedGroup = await updateGroup(groupId, title);

         if (updatedGroup instanceof Error) {
            throw updatedGroup; // Propagate the error
         }

         return res.status(200).json({ message: 'Group updated', group: updatedGroup });
      } catch (error) {
         return res.status(500).json({
            message: 'Error updating group',
            error: error.message,
         });
      }
   };

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

   
   deleteGroup = async (req, res) => {
      try {
         const { groupId } = req.params;

         // Check if the group exists before attempting to delete
         const existingGroup = await getGroupById(groupId);
         if (!existingGroup) {
            return res.status(404).json({ message: 'Group not found' });
         }

         // Check if the user has permission to delete the group (you may implement user authentication and authorization)
         if (existingGroup.creator_id !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
         }

         const deletedGroup = await deleteGroup(groupId);
         if (deletedGroup === 1) {
            return res.status(200).json({ message: 'Group deleted successfully' });
         } else {
            return res.status(500).json({ message: 'Error deleting group' });
         }
      } catch (error) {
         return res.status(500).json({
            message: 'Error deleting group',
            error: error.message,
         });
      }
   }

}

module.exports = new GroupController;