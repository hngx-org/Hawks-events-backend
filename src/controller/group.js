const { addGroup, updateGroup, deleteGroup} = require('../repository/group')
const {addGroup} = require('../repository/group');
const { addUserGroup } = require('../repository/user_groups');


class GroupController {

   createGroup = async(req, res) => {
      try {
         const { title } = req.body; 
         const group = await addGroup(title)
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