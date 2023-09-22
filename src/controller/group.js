const { 
  addUserGroup, 
  findMember, 
  removeAmemberFromGroup, 
  addGroup, 
  updateGroup, 
  deleteGroup 
} = require('../repository/user_groups');
const User = require("../models/user");
const Group = require("../models/group");


class GroupController {
  createGroup = async (req, res) => {
    try {
      const { title } = req.body;
      const group = await addGroup(title);
      await addUserGroup(req.user.id, group.id);
      return res.status(201).json({ message: "New group created", group });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating group",
        error: error.message,
      });
    }
  };

  // Update group details route handler
  updateGroup = async (req, res) => {
    try {
      const { groupId } = req.params;
      const { title } = req.body;


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

      const updatedGroup = await updateGroup(groupId, title);

      if (updatedGroup instanceof Error) {
        throw updatedGroup; // Propagate the error

      }

      return res
        .status(200)
        .json({ message: "Group updated", group: updatedGroup });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating group",
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
        return res.status(404).json({ message: "Group not found" });
      }

      // Check if the user has permission to delete the group (you may implement user authentication and authorization)
      if (existingGroup.creator_id !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
        
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
         const { groupId } = req.params
      const deletedGroup = await deleteGroup(groupId);
      if (deletedGroup === 1) {
        return res.status(200).json({ message: "Group deleted successfully" });
      } else {
        return res.status(500).json({ message: "Error deleting group" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting group",
        error: error.message,
      });
    }
  };


  // Retrieve users of a group route handler
  getUsersOfGroup = async (req, res) => {
    try {
      const { groupId } = req.params;

      // Find the group by its ID and include associated users
      const group = await Group.findByPk(groupId, {
        include: User,
      });

      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }

   }



      // Extract the users from the group object
      const users = group.Users;

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving users of the group",
        error: error.message,
      });
    }
  };

}

module.exports = new GroupController();
