const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect')
const { createGroup, updateGroup, deleteGroup, getUsersOfGroup } = require('../controller/group')


router.post('/create-group', protect, createGroup)
router.put('api/group/:groupId', protect, updateGroup)
router.delete('api/group/:groupId', protect, deleteGroup)
router.get('/api/groups/:groupId/users', getUsersOfGroup);


module.exports = router;