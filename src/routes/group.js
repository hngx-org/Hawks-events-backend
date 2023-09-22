const express = require('express');
const router = express.Router();

const {createGroup, addUserToGroup, removeUserFromGroup} = require('../controller/group')

router.post('/create-group', createGroup)
router.post('/:groupId/members/:userId', addUserToGroup);
router.delete('/:groupId/members/:userId', removeUserFromGroup)

module.exports = router;