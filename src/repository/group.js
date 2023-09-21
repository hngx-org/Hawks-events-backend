const Group = require('../models/group')
const { uuid } = require('uuidv4')

class GroupRepository {
   
   addGroup = async (title) => {
      try {
         const id = uuid()
         console.log(id)
         const newGroup = await Group.create({id, title})
         return JSON.parse(JSON.stringify(newGroup))
      } catch (error) {
         return error;
      }
   };

   // Update group details by UUID
   updateGroup = async (groupId, newTitle) => {
      try {
         const group = await Group.findOne({
            where: { id: groupId },
         });

         if (!group) {
            throw new Error('Group not found');
         }

         group.title = newTitle;
         await group.save();

         return JSON.parse(JSON.stringify(group));
      } catch (error) {
         return error;
      }
   };

   deleteGroup = async (groupId) => {
      try {
         const group = await Group.findByPk(groupId);
         if (!group) {
            return null; // Group not found
         }

         group.isDeleted = true; // Mark the group as deleted
         await group.save();

         return group;
      } catch (error) {
         return error;
      }
   };
}

module.exports = new GroupRepository;