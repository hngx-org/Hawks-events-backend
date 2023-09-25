const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect')
const {createGroup, addUserToGroup, removeUserFromGroup, updateGroup, deleteGroup, getGroups} = require('../controller/group')


router.post('/create-group', protect, createGroup)
router.put('api/group/:groupId', protect, updateGroup)
router.post('/:groupId/members/:userId', addUserToGroup);
router.delete('/:groupId/members/:userId', removeUserFromGroup)
router.delete('api/group/:groupId', protect, deleteGroup)
 router.get('/', getGroups);



module.exports = router;