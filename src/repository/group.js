const { Group } = require("../models/index")
// const Group = require('../models/group')

class GroupRepository {
   
   addGroup = async (id, title) => {
      try {
         const newGroup = await Group.create({id, title})
         // group.title = title;
         // await group.save();
         return JSON.parse(JSON.stringify(newGroup))
      } catch (error) {
         return error;
      }
   }

   findGroupById = async(group_id) => {
      try {
         const group = await Group.findByPk(group_id)
         return JSON.parse(JSON.stringify(group))
      } catch (error) {
         return error
      }
   }


   // Update group details by UUID
   updateGroup = async (group_id, title) => {
      try {
         const group = await Group.findByPk(group_id);

         if (!group) {
            throw new Error('Group not found');
         }

         group.title = title;
         await group.save();

         return JSON.parse(JSON.stringify(group));
      } catch (error) {
         return error;
      }
   };

   deleteGroup = async (group_id) => {
      try {
         const deletedGroup = await Group.destroy({
            where: { id: group_id }
         });
         return deletedGroup;
      } catch (error) {
         return error;
      }
   };

  deleteGroup = async (groupId) => {
    try {
      const deletedGroup = await Group.destroy({
        where: { id: groupId },
      });
      return deletedGroup;
    } catch (error) {
      return error;
    }
  };
}

module.exports = new GroupRepository;
