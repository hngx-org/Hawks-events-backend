const { uuid } = require("uuidv4")

const { 
  addGroup, 
  updateGroup, 
  deleteGroup, 
  findGroupById
} = require("../repository/group");

const { 
  addAUserToGroup,
  removeAmemberFromGroup,
  findAllMembers,
  findAMember,
} = require('../repository/user_groups');

const { findUserById } = require("../repository/user");


class GroupController {
  async createGroup(req, res) {
    try {
      const { title } = req.body;
      const id = uuid()
      await addGroup(id, title);
      const group = await findGroupById(id)
      console.log(group.id)
      await addAUserToGroup(req.user.dataValues.id, id);
    
      return res.status(201).json({ message: "New group created", group});
    } catch (error) {
      return res.status(500).json({
        message: "Error creating group",
        error: error.message,
      });
    }
  }

  async updateGroup(req, res) {
    try {
      const { groupId } = req.params;
      const { title } = req.body;
      const group = await findGroupById(groupId) 
      if (!group) {
        return res.status(400).json({message: "Group not found"})
      }
      const updatedGroup = await updateGroup(groupId, title);

      return res
        .status(200)
        .json({ message: "Group updated", group: updatedGroup });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating group",
        error: error.message,
      });
    }
  }

  async deleteGroup (req, res) {
    try {
       const { groupId } = req.params
       const deletedGroup = await deleteGroup(groupId);
       if (deletedGroup === 1) {
          return res.status(200).json({ message: "Group deleted successfully" });
       } else {
          return res.status(500).json({ message: "Group not found" });
       }
    } catch (error) {
       return res.status(500).json({
          message: "Error deleting group",
          error: error.message,
       });
    }
 }

  async addUserToGroup(req, res) {
    try {
      // Check if group exists
      const group = await findGroupById(req.params.groupId)
      if (!group) {
        return res.status(400).json({ message: "Group does not exist" });
      }

      // Check if user exists
      const user = await findUserById(req.params.userId)
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Check if user is in the group already
      const isAMember = await findAMember(req.params.userId, req.params.groupId);
      if (isAMember === true) {
        return res.status(400).json({ message: "This user is already a member of this group" });
      }

      // Add user to the group
      const data = await addAUserToGroup(req.params.userId, req.params.groupId);
      return res.status(201).json({ message: "User added to group", data });
    } catch (error) {
      return res.status(500).json({
        message: "Error adding user to group",
        error: error.message
      });
    }
  }

  async removeUserFromGroup(req, res) {
    try {
      // Check if user is in the group
      const isAMember = await findAMember(req.params.userId, req.params.groupId);
      if (!isAMember) {
        return res.status(400).json({ message: "User not found in group" });
      }

      // Remove user from the group
      await removeAmemberFromGroup(req.params.userId, req.params.groupId);
      return res.status(200).json({ message: "User removed from group" });
    } catch (error) {
      return res.status(500).json({
        message: "Error removing user from group",
        error: error.message
      });
    }
  }

  async getUsersOfGroup(req, res) {
    try {
      const { groupId } = req.params;
      const members = await findAllMembers(groupId)
  
      if (!members) {
        return res.status(404).json({ message: "Group members not found" });
      }

      return res.status(200).json({ members });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving group members",
        error: error.message,
      });
    }
  }
}

module.exports = new GroupController;
