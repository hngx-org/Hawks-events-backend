const express = require('express');
const router = express.Router();

const protect = require('../middlewares/protect')
const { createGroup, updateGroup, deleteGroup } = require('../controller/group')
// use case 
// router.get("/", protect, createGroup) => ALL ROUTES HERE SHOULD HAVE THIS!
// Post - Create group with details
router.post('/create-group', protect, createGroup)
// PUT /api/group/:groupId - Update group details
router.put('api/group/:groupId', protect, updateGroup)

router.delete('api/group/:groupId', protect, deleteGroup)
module.exports = router;