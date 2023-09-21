const express = require('express');
const router = express.Router();

const { createGroup, updateGroup, deleteGroup} = require('../controller/group')

// Post - Create group with details
router.post('/create-group', createGroup)
// PUT /api/group/:groupId - Update group details
router.put('api/group/:groupId', updateGroup)

router.delete('api/group/:groupId', deleteGroup)
module.exports = router;