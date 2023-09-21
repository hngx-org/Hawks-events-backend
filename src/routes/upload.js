const express = require('express')
const image_controller = require('../controller/image_upload')
const multer = require('multer')
const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({ storage })

router.post('/upload', upload.single('image'), image_controller.upload_image)

module.exports = router
