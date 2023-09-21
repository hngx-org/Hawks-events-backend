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
   }

}

module.exports = new GroupController;