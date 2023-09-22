const { addGroup } = require("../repository/group");
const { MESSAGES } = require("../config/constants");
const { ServerError } = require("../error/errors");

class GroupController {
  createGroup = async (req, res) => {
    try {
      const { title } = req.body;
      const newGroup = await addGroup(title);
    } catch (error) {
      throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };
}

module.exports = new GroupController();
