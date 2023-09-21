const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect')
const {createGroup} = require('../controller/group')


// use case 
// router.get("/", protect, createGroup) => ALL ROUTES HERE SHOULD HAVE THIS!


router.post('/create-group', protect, createGroup)

module.exports = router;