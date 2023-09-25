const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect')
const {
   createGroup, 
   addUserToGroup, 
   removeUserFromGroup, 
   updateGroup, 
   deleteGroup, 
   getUsersOfGroup
} = require('../controller/group')


router.post('/create-group', protect, createGroup)
router.put('/:groupId', protect, updateGroup)
router.post('/:groupId/members/:userId', addUserToGroup);
router.delete('/:groupId/members/:userId', removeUserFromGroup)
router.delete('/:groupId', protect, deleteGroup)
router.get('/:groupId/users', getUsersOfGroup);



module.exports = router;