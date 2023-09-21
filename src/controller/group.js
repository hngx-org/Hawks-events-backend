const { addGroup, updateGroup, deleteGroup} = require('../repository/group')


class GroupController {

   createGroup = async(req, res) => {
      try {
         const { title } = req.body; 
         const newGroup = await addGroup(title);
         res.json(newGroup);
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
            throw updatedGroup; // Pass the error to the catch block
         }

         res.json(updatedGroup);
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
         const deletedGroup = await deleteGroup(groupId);
         
         if (!deletedGroup) {
            return res.status(404).json({
               message: "Group not found"
            });
         }

         res.json({
            message: "Group deleted successfully"
         });
      } catch (error) {
         return res.status(500).json({
            message: "Error deleting group",
            error: error.message
         });
      }
   };
}

module.exports = new GroupController;